
import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IClientsRepository } from '../../implements/IClientsRepository';
import { UserDocument } from 'src/mongo/schemas/user';
import { ClientDocument, ClientMongo } from 'src/mongo/schemas/client';
import { Client } from 'src/modules/client/entities/Client';




@Injectable()
export class ClientsRepositoryMongo implements IClientsRepository {
  constructor( 
    @InjectModel("user")
    private readonly userModel: Model<UserDocument>,
    @InjectModel("client")
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(client: Client): Promise<ClientMongo> {
    const newClient = await this.clientModel.create(client)
    await this.userModel.findOneAndUpdate({_id: newClient.user_id}, 
      {$push: {clients: newClient._id}})
    return newClient
  }

  async findMany(user_id: string, skip: number, limit: number, q: string): Promise<{clients: ClientMongo[], total: number}> {

    const clients = await this.clientModel.find({user_id, 
      $or: [
        { name: { $regex: String(q), $options: "i" } },
        { email: { $regex: String(q), $options: "i" } },
        { cpf: { $regex: String(q), $options: "i" } },
        { phone: { $regex: String(q), $options: "i" } },
        { address: { $regex: String(q), $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit)
      .populate('user_id', ['fullname', 'username', 'email', 'isAdmin', 'created_at'])

    const clientsTotal = await this.clientModel.find({user_id, 
      $or: [
        { name: { $regex: String(q), $options: "i" } },
        { email: { $regex: String(q), $options: "i" } },
        { cpf: { $regex: String(q), $options: "i" } },
        { phone: { $regex: String(q), $options: "i" } },
        { address: { $regex: String(q), $options: "i" } },
      ],
    })

    return {
      clients: clients as any,
      total: clientsTotal.length
    }
  }

  async findById(user_id: string, client_id: string): Promise<ClientMongo> {

    const client = await this.clientModel.findOne({_id: client_id})
    return client
  }

  async findByEmail(user_id: string, email: string): Promise<ClientMongo> {

    const client = await this.clientModel.findOne({user_id: new mongoose.Types.ObjectId(user_id), email: email})
    return client
  }

  async findByCpf(user_id: string, cpf: string): Promise<ClientMongo> {

    const client = await this.clientModel.findOne({user_id, cpf})
    return client
  }

  async update(user_id: string, client_id: string, data: Client): Promise<ClientMongo> {
    const client = await this.clientModel.findOneAndUpdate({_id: client_id, user_id}, data)
    return client
  }

  async delete(user_id: string, client_id: string): Promise<void> {
    await this.clientModel.findOneAndDelete({_id: client_id, user_id})
    await this.userModel.updateOne({_id: user_id}, {
      "$pull": {"clients": client_id}
    })
  }
}