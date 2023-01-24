
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './../../implements/IUsersRepository';
import { User } from 'src/modules/user/entities/User';
import { UserDocument, UserMongo } from 'src/mongo/schemas/user';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUserMapper } from '../mappers/UserMapperMongo';
import { UpdateUserDTO } from './../../../DTOs/UpdateUserDTO';
import { ClientDocument } from 'src/mongo/schemas/client';

@Injectable()
export class UsersRepositoryMongo implements IUsersRepository {
  constructor( 
  @InjectModel("user")
  private readonly userModel: Model<UserDocument>,
  @InjectModel("client")
  private readonly clientModel: Model<ClientDocument>,
  ) {}
  
  
  async create(user: User): Promise<UserMongo> {
    const raw = MongoUserMapper.toMongo(user)

    const newUser = await this.userModel.create(raw)
    return newUser
  }

  

  async findMany(skip: number, limit: number, q: string): Promise<{users: UserMongo[], total: number}> {
    const users = await this.userModel.find({
      $or: [
        { username: { $regex: String(q), $options: "i" } },
        { fullname: { $regex: String(q), $options: "i" } },
        { email: { $regex: String(q), $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit)
      .populate('clients', ['_id', 'name', 'email', 'phone', 'address', 'cpf', 'created_at', 'updated_at'])
    const totalUsers = await this.userModel.find({
      $or: [
        { username: { $regex: String(q), $options: "i" } },
        { fullname: { $regex: String(q), $options: "i" } },
        { email: { $regex: String(q), $options: "i" } },
      ],
    })
    return {
      users,
      total: totalUsers.length
    }

  }

  async findById(id: string): Promise<UserMongo> {
    const user = await this.userModel.findOne({
      _id: id
    }).populate("clients", "-user_id")
    return user
  }

  async findByEmail(email: string): Promise<UserMongo> {
    const user = await this.userModel.findOne({
      email
    }).exec()
    return user
  }

  async findByUsername(username: string): Promise<UserMongo> {
    const user = await this.userModel.findOne({
      username
    }).exec()
    return user
  }

  async findByUsernameOrEmail(data: string): Promise<UserMongo> {
    const user = await this.userModel.findOne({
      $or: [
        {email: data},
        {username: data}
      ]
    })
    return user
  }

  async findByIdAndDelete(id: string): Promise<void> {
    await this.userModel.findOneAndDelete({_id: id})
    await this.clientModel.deleteMany({user_id: new mongoose.Types.ObjectId(id)})
  }

  async findByIdAndUpdate(id: string, data: UpdateUserDTO): Promise<UserMongo> {
    const user = await this.userModel.findOneAndUpdate({_id: id}, data)
    return user
  }
  
}