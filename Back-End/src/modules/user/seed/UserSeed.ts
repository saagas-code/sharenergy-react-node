
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema, UserDocument } from 'src/mongo/schemas/user';
import { ClientDocument } from 'src/mongo/schemas/client';
import { hash } from 'bcrypt';
import { User } from '../entities/User';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor( 
    @InjectModel("user")
    private readonly userModel: Model<UserDocument>,
    ) {}

    async onModuleInit ()  {
      

      const passwordHash = await hash('sh@r3n3rgy', 10)
      const newUser = {
        username: 'desafiosharenergy',
        fullname: 'admin',
        password: passwordHash,
        email: 'sharenergy@energy.com',
        isAdmin: true
      }

      const findAdmin = await this.userModel.findOne({email: newUser.email})
      if(findAdmin) {
        return
      }
      const user = new User()
      Object.assign(user, newUser)
      await this.userModel.create(user)
    }
}