import { Client } from './../../entities/Client';

import { Client as ClientSchema } from "src/mongo/schemas/client";
import { ClientMongo } from './../../../../mongo/schemas/client';


export abstract class IClientsRepository {
  abstract create(user: Client): Promise<ClientMongo>;
  abstract findMany(user_id: string, skip: number, limit: number, q: string): Promise<{clients: ClientMongo[], total: number}>
  abstract findById(user_id: string, client_id: string): Promise<ClientMongo>
  abstract findByEmail(user_id: string, email: string): Promise<ClientMongo>
  abstract findByCpf(user_id: string, cpf: string): Promise<ClientMongo>
  abstract update(user_id: string, client_id: string, data: ClientSchema): Promise<ClientMongo>
  abstract delete(user_id: string, client_id: string): Promise<void>
}