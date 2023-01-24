import { User } from '../../entities/User';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../database/implements/IUsersRepository';
import { UserNotFound } from './../../../../errors/UserNotFound';
import { UserMongo } from 'src/mongo/schemas/user';

@Injectable()
export class FindUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<UserMongo> {
    // return
    // console.log(id)
    const user = await this.usersRepository.findById(id);
    console.log('testt', user)
    if(!user) {
      throw new UserNotFound()
    }
    
    return user
  }

}