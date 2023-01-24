import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientData, updateClients } from './../services/api/Clients';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Client } from './../interfaces/Client';
import { apiRandom } from './../services/api/index';

interface AuthErrors {
  email?: string,
  cpf?: string
}

export const useEditClient = () => {
  const [clientData, setClientData] = useState<Client>()
  const [authErrors, setAuthErrors] = useState<AuthErrors>({})

  const {id} = useParams()
  const navigate = useNavigate()

  const fetchData = async () => {
    const {data} = await api.get(`/clients/${id}`)
    setClientData(data)
  }

  const editData = async (ClientData: ClientData) => {
    try {
      const response = await updateClients(id as string, ClientData)
      alert("Dados salvos com sucesso !")
      navigate("/users")
      return response
    } catch (err: any) {
      const error = err.response.data
      setAuthErrors(error)
      return
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return ({
    clientData, setClientData, 
    authErrors, setAuthErrors,
    navigate, editData
  })
}