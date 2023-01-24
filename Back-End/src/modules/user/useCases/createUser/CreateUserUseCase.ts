import { User } from '../../entities/User';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../database/implements/IUsersRepository';
import { CreateUserDTO } from './CreateUserController';
import {hash} from 'bcrypt'
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { EmailAlreadyExists } from './../../../../errors/EmailAlreadyExists';
import { UsernameAlreadyExists } from './../../../../errors/UsernameAlreadyExists';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: CreateUserDTO) {
    let errors = {} as any

    const emailExists = await this.usersRepository.findByEmail(data.email)
    if(emailExists) {
      const emailError = new EmailAlreadyExists()
      errors.email = emailError.message
    }

    const userExists = await this.usersRepository.findByUsername(data.username)
    if(userExists) {
      const userError = new UsernameAlreadyExists() 
      errors.username = userError.message
    }

    if(errors.email || errors.username) {
      throw new HttpException(errors, HttpStatus.CONFLICT)
    }

    data.password = await hash(data.password, 10)
    const user = new User()
    Object.assign(user, data)

    const newUser = await this.usersRepository.create(user)
    return newUser
  }
}