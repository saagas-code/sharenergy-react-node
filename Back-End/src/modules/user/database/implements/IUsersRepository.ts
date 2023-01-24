import { UserMongo } from "../../../../mongo/schemas/user";
import { UpdateUserDTO } from "../../DTOs/UpdateUserDTO";
import { User } from "../../entities/User";


export abstract class IUsersRepository {
  abstract create(user: User): Promise<UserMongo>;
  abstract findMany(page: number, limit: number, q: string): Promise<{users: UserMongo[], total: number}>;
  abstract findById(id: string): Promise<UserMongo>
  abstract findByEmail(email: string): Promise<UserMongo>
  abstract findByUsername(username: string): Promise<UserMongo>
  abstract findByUsernameOrEmail(data: string): Promise<UserMongo>
  abstract findByIdAndDelete(id: string): Promise<void>
  abstract findByIdAndUpdate(id: string, data: UpdateUserDTO): Promise<UserMongo>
}