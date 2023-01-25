import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Client } from './../interfaces/Client';
import  axios  from 'axios';

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
    const {data} = await axios.patch(`/clients/${id}`)
    setClientData(data)
  }

  const editData = async (ClientData: Partial<Client>) => {
    try {
      const response = await axios.post(`/clients/${id}`, ClientData)
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