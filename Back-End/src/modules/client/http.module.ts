import { Module } from '@nestjs/common'

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserDatabaseModule } from '../user/database.module';

import { ClientDatabaseModule } from './database.module';
import { CreateClientController } from './useCases/createClient/CreateClientController';
import { CreateClientUseCase } from './useCases/createClient/CreateClientUseCase';
import { DeleteClientController } from './useCases/deleteClient/DeleteClientController';
import { DeleteClientUseCase } from './useCases/deleteClient/DeleteClientUseCase';
import { FindClientController } from './useCases/findClient/FindClientController';
import { FindClientUseCase } from './useCases/findClient/FindClientUseCase';
import { ListClientController } from './useCases/listClient/ListClientController';
import { ListClientUseCase } from './useCases/listClient/ListClientUseCase';
import { UpdateClientController } from './useCases/updateClient/UpdateClientController';
import { UpdateClientUseCase } from './useCases/updateClient/UpdateClientUseCase';


@Module({
  imports: [
    ClientDatabaseModule,
    UserDatabaseModule,
  ],
  controllers: [
    CreateClientController, ListClientController, FindClientController,
    UpdateClientController, DeleteClientController

  ],
  providers: [
    CreateClientUseCase, ListClientUseCase, FindClientUseCase, UpdateClientUseCase,
    DeleteClientUseCase,
  ],
  exports: []
  
})

export class ClientHttpModule {}
