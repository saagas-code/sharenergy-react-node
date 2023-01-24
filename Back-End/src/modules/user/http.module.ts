import { Module } from '@nestjs/common'

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ListUserController } from './useCases/listUser/ListUserController';
import { ListUserUseCase } from './useCases/listUser/ListUserUseCase';
import { UserDatabaseModule } from './database.module';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { FindUserController } from './useCases/findUser/findUserController';
import { FindUserUseCase } from './useCases/findUser/findUserUseCase';
import { DeleteUserController } from './useCases/deleteUser/DeleteUserController';
import { DeleteUserUseCase } from './useCases/deleteUser/DeleteUserUseCase';
import { UpdateUserUseCase } from './useCases/updateUser/UpdateUserUseCase';
import { UpdateUserController } from './useCases/updateUser/UpdateUserController';
import { AuthUserController } from './useCases/authUser/AuthUserController';
import { AuthUserUseCase } from './useCases/authUser/AuthUserUseCase';
import { JwtStrategy } from './../../common/strategy/jwt.strategy';
import { RequestUserUseCase } from './useCases/requestUser/RequestUserUseCase';
import { RequestUserController } from './useCases/requestUser/RequestUserController';


@Module({
  imports: [
  
  UserDatabaseModule,
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY || '8819',
    signOptions: {
      expiresIn: 3600
    }
  })
  ],
  controllers: [
    ListUserController, CreateUserController, FindUserController, 
    DeleteUserController, UpdateUserController, AuthUserController,
    RequestUserController,

  ],
  providers: [
    ListUserUseCase,
    CreateUserUseCase,
    FindUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    AuthUserUseCase,
    RequestUserUseCase,
    JwtStrategy
    
  ],
  exports: [JwtStrategy, PassportModule]
  
})

export class UserHttpModule {}
