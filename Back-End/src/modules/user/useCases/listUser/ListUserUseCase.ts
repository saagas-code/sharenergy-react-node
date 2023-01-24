import { User } from '../../entities/User';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../database/implements/IUsersRepository';
import { IListUserQuery } from './ListUserController';


@Injectable()
export class ListUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute({page = 1, limit = 10, q = ''}: IListUserQuery): Promise<{users: User[], total: number}> {
    q = q.trim()
    let skip = (page - 1) * limit
    const users = await this.usersRepository.findMany(skip, limit, q);
    return users
  }

}