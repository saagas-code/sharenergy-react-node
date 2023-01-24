
import {Module} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { ClientSchema } from "../../mongo/schemas/client";
import { UserSchema } from "../../mongo/schemas/user";
import { CreateClientUseCase } from "./useCases/createClient/CreateClientUseCase";
import { IClientsRepository } from "./database/implements/IClientsRepository";
import { ClientsRepositoryMongo } from "./database/mongo/repositories/ClientsRepositoryMongo";
import { UserHttpModule } from "../user/http.module";
import { UserDatabaseModule } from "../user/database.module";
import { ListClientUseCase } from "./useCases/listClient/ListClientUseCase";
import { FindClientUseCase } from "./useCases/findClient/FindClientUseCase";
import { UpdateClientUseCase } from "./useCases/updateClient/UpdateClientUseCase";
import { DeleteClientUseCase } from "./useCases/deleteClient/DeleteClientUseCase";


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'user', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'client', schema: ClientSchema}]),
    UserDatabaseModule,
    UserHttpModule
  ],
  providers: [
    CreateClientUseCase , ListClientUseCase, FindClientUseCase,
    UpdateClientUseCase, DeleteClientUseCase,
    {
      provide: IClientsRepository,
      useClass: ClientsRepositoryMongo
    },
  ],

  exports: [IClientsRepository]
})
export class ClientDatabaseModule {}