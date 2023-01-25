
import { Client } from './../../interfaces/Client';
import  axios  from 'axios';

export interface getClients {
  total: number,
  clients: Client[]
}

export interface ClientData {
  name: string;
  email: string;
  address: string;
  phone: string;
  cpf: string;
}
