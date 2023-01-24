import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDatabaseModule } from './modules/user/database.module';
import { UserHttpModule } from './modules/user/http.module';
import {  ClientSchema } from './mongo/schemas/client';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientDatabaseModule } from './modules/client/database.module';
import { ClientHttpModule } from './modules/client/http.module';
import { UserSchema } from './mongo/schemas/user';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
      }),
    }),
    MongooseModule.forFeature([{name: 'user', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'client', schema: ClientSchema}]),

    UserDatabaseModule,
    ClientDatabaseModule,
    
    UserHttpModule,
    ClientHttpModule
  ]
})
export class AppModule {}