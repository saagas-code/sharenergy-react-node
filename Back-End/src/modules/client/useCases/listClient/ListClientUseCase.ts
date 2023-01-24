import { Injectable } from '@nestjs/common';
import { IClientsRepository } from '../../database/implements/IClientsRepository';
// import { UserNotFound } from 'src/errors/UserNotFound';
import { IListClientQuery } from './ListClientController';

@Injectable()
export class ListClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
    // private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string, {page = 1, limit = 10, q = ''}: IListClientQuery) {
    q = q.trim()
    // const user = await this.usersRepository.findById(user_id)
    // if(!user) {
    //   throw new UserNotFound()
    // }

    let skip = (page - 1) * limit
    const clients = await this.clientsRepository.findMany(user_id, skip, limit, q)
    return clients
  }
}