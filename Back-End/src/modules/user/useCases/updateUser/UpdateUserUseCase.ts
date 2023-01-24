import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../database/implements/IUsersRepository';
import { UpdateUserDTO } from '../../DTOs/UpdateUserDTO';
import { hash } from 'bcrypt';
import { UserMongo } from 'src/mongo/schemas/user';
import { EmailAlreadyExists } from './../../../../errors/EmailAlreadyExists';
import { UsernameAlreadyExists } from './../../../../errors/UsernameAlreadyExists';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: UpdateUserDTO): Promise<UserMongo> {

    const emailExists = await this.usersRepository.findByEmail(data.email)
    if(emailExists) {
      throw new EmailAlreadyExists()
    }

    const usernameExists = await this.usersRepository.findByUsername(data.username)
    if(usernameExists) {
      throw new UsernameAlreadyExists()
    }
    
    if(data.password) {
      data.password = await hash(data.password, 10)
    }

    const newUser = await this.usersRepository.findByIdAndUpdate(id, data);

    const user = await this.usersRepository.findById(newUser._id)
    return user
  }

}