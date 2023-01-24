import { IClientsRepository } from '../../../implements/IClientsRepository';
import { Client } from './../../../../entities/Client';
import { ClientMongo } from './../../../../../../mongo/schemas/client';
import { MongoClientMapper } from './../../mappers/UserMapperMongo';
import mongoose from 'mongoose';
import { FindClientByUserId } from './../../../../../../common/helpers/findClientByUserId';




export class ClientsRepositoryInMemory implements IClientsRepository {
  clients: ClientMongo[] = []
  
  async create(user: Client): Promise<ClientMongo> {
    let raw = MongoClientMapper.toMongo(user)
    const newClient = {...raw, _id: new mongoose.Types.ObjectId().toString()}
    this.clients.push(newClient)
    return newClient
  }
  async findMany(user_id: string, skip: number, limit: number, q: string): Promise<{ clients: ClientMongo[]; total: number; }> {
    const clients = FindClientByUserId(this.clients, user_id)
    return  {
      clients,
      total: clients.length
    }
  }
  async findById(user_id: string, client_id: string): Promise<ClientMongo> {
    const clients = FindClientByUserId(this.clients, user_id)
    const client = clients.find((i) => i._id === client_id)
    if(!client) {
      return null
    }
    return client
  }
  async findByEmail(user_id: string, email: string): Promise<ClientMongo> {
    const clients = FindClientByUserId(this.clients, user_id)
    const client = clients.find((i) => i.email === email)
    return client
  }
  async findByCpf(user_id: string, cpf: string): Promise<ClientMongo> {
    const clients = FindClientByUserId(this.clients, user_id)
    const client = clients.find((i) => i.cpf === cpf)
    return client
  }
  async update(user_id: string, client_id: string, data: Client): Promise<ClientMongo> {
    const clientIndex = this.clients.findIndex((i) => i._id === client_id)
    if(clientIndex > -1) {
      const client = this.clients[clientIndex]
      const clientUpdated = Object.assign(client, data)
      this.clients[clientIndex] = clientUpdated
      return this.clients[clientIndex]
    }
    return
  }
  async delete(user_id: string, client_id: string): Promise<void> {
    const clientIndex = this.clients.findIndex((i) => i._id === client_id)
    if(clientIndex > -1) {
      this.clients.splice(clientIndex, 1)
    }
  }
  
  
  
  
}