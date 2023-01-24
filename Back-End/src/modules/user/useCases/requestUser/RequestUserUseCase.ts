import { User } from '../../entities/User';
import {hash} from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../database/implements/IUsersRepository';
import { UserMongo } from './../../../../mongo/schemas/user';
import { UserNotFound } from './../../../../errors/UserNotFound';



@Injectable()
export class RequestUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<UserMongo> {

    const user = await this.usersRepository.findById(id);
    if(!user) {
      throw new UserNotFound()
    }

    return user
  }
}