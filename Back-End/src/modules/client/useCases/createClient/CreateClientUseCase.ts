import { Injectable } from '@nestjs/common';
import { IClientsRepository } from '../../database/implements/IClientsRepository';
import { CreateClientDTO } from './../../DTOs/CreateClientDTO';
import { EmailAlreadyExists } from './../../../../errors/EmailAlreadyExists';
import { CpfAlreadyExists } from './../../../../errors/CpfAlreadyExists';
import { Client } from '../../entities/Client';


@Injectable()
export class CreateClientUseCase {
  constructor(
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(data: CreateClientDTO, user_id: string) {

    const emailAlreadyExists = await this.clientsRepository.findByEmail(user_id, data.email)
    if(emailAlreadyExists) {
      throw new EmailAlreadyExists()
    }

    const cpfAlreadyExists = await this.clientsRepository.findByCpf(user_id, data.cpf)
    if(cpfAlreadyExists) {
      throw new CpfAlreadyExists()
    }
    
    const client = new Client()
    Object.assign(client, {...data, user_id: user_id})
    
    const newClient = await this.clientsRepository.create(client)
    return newClient
  }
}