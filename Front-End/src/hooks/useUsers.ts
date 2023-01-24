import { api } from "../services/api"
import { useMutation } from 'react-query';
import { queryClient } from './../services/queryClient';



export const useUsers = () => {
  const token = localStorage.getItem("token")

    const config = {
      headers: {
        'Authorization': 'Bearer ' +token
      }
    }

  const fetchUsers = async (page: number, limit: number, q: string) => {
    
    const {data} = await api.get(`/clients?page=${page}&limit=${limit}&q=${q}`, config)
    return data
  }

  const {mutate: deleteAction} = useMutation(
    (id: string) => api.delete(`/clients/${id}`, config), {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients"])
      }
    }
  )

  

  return ({
    fetchUsers, deleteAction
  })
}