import  axios  from 'axios';
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
    
    const {data} = await axios.get(`/clients?page=${page}&limit=${limit}&q=${q}`, config)
    return data
  }

  const {mutate: deleteAction} = useMutation(
    (id: string) => axios.delete(`/clients/${id}`, config), {
      onSuccess: () => {
        queryClient.invalidateQueries(["clients"])
      }
    }
  )

  

  return ({
    fetchUsers, deleteAction
  })
}