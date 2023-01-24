
import {Module} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../mongo/schemas/user";
import { IUsersRepository } from "../user/database/implements/IUsersRepository";
import { UsersRepositoryMongo } from "../user/database/mongo/repositories/UsersRepositoryMongo";
import { AuthUserUseCase } from "./useCases/authUser/AuthUserUseCase";
import { CreateUserUseCase } from "./useCases/createUser/CreateUserUseCase";
import { DeleteUserUseCase } from "./useCases/deleteUser/DeleteUserUseCase";
import { FindUserUseCase } from "./useCases/findUser/findUserUseCase";
import {ListUserUseCase} from './useCases/listUser/ListUserUseCase'
import { UpdateUserUseCase } from "./useCases/updateUser/UpdateUserUseCase";
import { JwtService } from "@nestjs/jwt";
import { RequestUserUseCase } from "./useCases/requestUser/RequestUserUseCase";
import { ClientSchema } from "src/mongo/schemas/client";
import { UsersService } from "./seed/UserSeed";


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'user', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'client', schema: ClientSchema}]),
    // ClientDatabaseModule,
    // ClientHttpModule
  ],
  providers: [
    ListUserUseCase , CreateUserUseCase, FindUserUseCase,
    DeleteUserUseCase, UpdateUserUseCase, AuthUserUseCase,
    AuthUserUseCase, RequestUserUseCase, JwtService, UsersService,
    {
      provide: IUsersRepository,
      useClass: UsersRepositoryMongo
    },
  ],

  exports: [IUsersRepository, UsersService]
})
export class UserDatabaseModule {}