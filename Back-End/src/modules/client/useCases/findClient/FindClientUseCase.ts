import { Injectable } from '@nestjs/common';
import { IClientsRepository } from '../../database/implements/IClientsRepository';
import { ClientNotFound } from './../../../../errors/ClientNotFound';
// import { IUsersRepository } from 'src/modules/user/database/implements/IUsersRepository';
// import { UserNotFound } from 'src/errors/UserNotFound';



@Injectable()
export class FindClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
    // private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string, client_id: string) {

    // const user = await this.usersRepository.findById(user_id)
    // if(!user) {
    //   throw new UserNotFound()
    // }
    
    const client = await this.clientsRepository.findById(user_id, client_id)
    if(!client) {
      throw new ClientNotFound()
    }
    
    return client
  }
}