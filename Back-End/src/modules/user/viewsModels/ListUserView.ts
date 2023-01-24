
import { UserMongo } from '../../../mongo/schemas/user';
import { Client } from './../../client/entities/Client';



export interface IUserViewHTTP {
  _id: string,
  username: string,
  fullname: string
  isAdmin: boolean
  created_at: Date,
  clients: Client[]
}

export class UserViewModel {
  static toHTTP(user: UserMongo) {
    return {
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      created_at: user.created_at,
      clients: user.clients
    }
  }
}