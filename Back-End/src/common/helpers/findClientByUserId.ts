
import { ClientMongo } from './../../mongo/schemas/client';

export const FindClientByUserId = (clients: ClientMongo[], user_id: string) => {
  return clients.filter(i => i.user_id === user_id).map(
    i => i
  )
}