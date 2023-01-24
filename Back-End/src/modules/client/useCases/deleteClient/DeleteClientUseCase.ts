import { Injectable } from '@nestjs/common';
import { IClientsRepository } from '../../database/implements/IClientsRepository';
import { ClientNotFound } from '../../../../errors/ClientNotFound';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(user_id: string, client_id: string): Promise<void> {

    const client = await this.clientsRepository.findById(user_id, client_id)
    if(!client) {
      throw new ClientNotFound()
    }

    await this.clientsRepository.delete(user_id, client_id)
  }

}