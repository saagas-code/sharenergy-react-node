import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../database/implements/IUsersRepository';
import { UserNotFound } from '../../../../errors/UserNotFound';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {

    const userExists = await this.usersRepository.findById(id)
    if(!userExists) {
      throw new UserNotFound()
    }
    
    await this.usersRepository.findByIdAndDelete(id);
    
  }

}