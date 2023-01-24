import { Injectable } from '@nestjs/common';
import { IClientsRepository } from '../../database/implements/IClientsRepository';
import { UpdateClientDTO } from '../../DTOs/UpdateClientDTO';
import { EmailAlreadyExists } from './../../../../errors/EmailAlreadyExists';
import { CpfAlreadyExists } from './../../../../errors/CpfAlreadyExists';
import { ClientNotFound } from '../../../../errors/ClientNotFound';
import { ClientMongo } from './../../../../mongo/schemas/client';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(user_id: string, client_id: string, data: UpdateClientDTO): Promise<ClientMongo> {

    const client = await this.clientsRepository.findById(user_id, client_id)
    if(!client) {
      throw new ClientNotFound()
    }

    const emailExists = await this.clientsRepository.findByEmail(user_id, data.email)
    
    if(emailExists && emailExists._id != client_id) {
      console.log(emailExists, client_id)
      throw new EmailAlreadyExists()
    }

    const cpfExists = await this.clientsRepository.findByCpf(user_id, data.cpf)
    if(cpfExists && cpfExists._id != client_id) {
      throw new CpfAlreadyExists()
    }

    Object.assign(client, {...data, updated_at: new Date()})
    
    const updatedClient = await this.clientsRepository.update(user_id, client_id, client)

    return updatedClient as any
  }

}