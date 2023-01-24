
import { User } from './../../../entities/User';


export class MongoUserMapper {
  static toMongo(user: User) {
    return {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      password: user.password,
      created_at: user.created_at,
      clients: user.clients
    }
  }

}