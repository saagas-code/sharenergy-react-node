
import { api } from '.';
import { Client } from './../../interfaces/Client';

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


// export const addClient = async (ClientData: ClientData) => {
//   const {data} = await api.post("/clients", ClientData)
//   return data
// }

// export const getClients = async (page: number, limit: number, q: string) => {
//   const {data} = await api.get(`/clients?page=${page}&limit=${limit}&q=${q}`, config)
//   return data
// }

export const updateClients = async (id: string, ClientData: ClientData) => {
  const {data} = await api.patch(`/clients/${id}`, ClientData)
  return data
}

export const deleteClient = async (id: string) => {
  const {data} = await api.delete(`/clients/${id}`)
  return data
}