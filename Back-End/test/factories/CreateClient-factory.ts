
import { User } from './../../src/modules/user/entities/User';
import { Client } from './../../src/modules/client/entities/Client';


type Override = Partial<Client>

export function makeClient(override: Override = {})  {
  const newClient =  new Client()
  Object.assign(newClient, {
    name: 'test',
    email: 'test@gmail.com',
    phone: '21988198728',
    address: 'Rua Teste',
    cpf: '00000000000',
    ...override
  })
  return newClient
}

