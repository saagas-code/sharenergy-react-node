
import { v4 } from 'uuid';

export class Client {
  name: string;
  email: string;
  phone: string
  address: string;
  cpf: string;
  created_at?: Date;
  updated_at?: Date | null;
  user_id: string

  constructor() {
    this.created_at = this.created_at ?? new Date()
    this.updated_at = this.updated_at ?? null
  }

}