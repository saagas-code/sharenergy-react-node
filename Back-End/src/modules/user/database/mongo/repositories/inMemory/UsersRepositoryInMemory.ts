import { IUsersRepository } from '../../../implements/IUsersRepository';
import { UpdateUserDTO } from 'src/modules/user/DTOs/UpdateUserDTO';
import { UserMongo } from 'src/mongo/schemas/user';
import { User } from 'src/modules/user/entities/User';
import mongoose from 'mongoose';
import { MongoUserMapper } from './../../mappers/UserMapperMongo';


export class UsersRepositoryInMemory implements IUsersRepository {
  users: UserMongo[] = []
  
  async create(user: User): Promise<UserMongo> {
    let raw = MongoUserMapper.toMongo(user)
    const newUser = {...raw, _id: new mongoose.Types.ObjectId().toString()}
    this.users.push(newUser as UserMongo)
    return newUser as UserMongo
  }

  async findMany(page: number, limit: number, q: string): Promise<{ users: UserMongo[]; total: number; }> {
    return {
      users: this.users,
      total: this.users.length
    }
  }
  async findById(id: string): Promise<UserMongo> {
    const user = this.users.find((i) => i._id === id)
    if(!user) {
      return null
    }
    return user
  }
  async findByEmail(email: string): Promise<UserMongo> {
    const user = this.users.find((i) => i.email === email)
    if(!user) {
      return null
    }
    return user
  }

  async findByUsername(username: string): Promise<UserMongo> {
    const user = this.users.find((i) => i.username === username)
    if(!user) {
      return null
    }
    return user
  }

  async findByUsernameOrEmail(data: string): Promise<UserMongo> {
    const user = this.users.find((i) => i.username === data || i.email === data)
    if(!user) {
      return null
    }
    return user
  }

  async findByIdAndDelete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((i) => i._id === id)

    if(userIndex > -1) {
      this.users.splice(userIndex, 1)
    }
  }
  async findByIdAndUpdate(id: string, data: UpdateUserDTO): Promise<UserMongo> {
    const userIndex = this.users.findIndex((i) => i._id === id)
    
    if(userIndex > -1) {
      const user = this.users[userIndex]
      const userUpdated = Object.assign(user, data)
      this.users[userIndex] = userUpdated
      return this.users[userIndex]
    }
  }
  
}