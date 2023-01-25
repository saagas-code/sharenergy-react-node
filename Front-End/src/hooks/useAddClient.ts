import { useState } from 'react';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';

interface AuthErrors {
  email?: string,
  cpf?: string
}

const token =  localStorage.getItem("token")
const config = {
  headers: {
    'Authorization': 'Bearer ' +token
  }
}

export const useAddClient = () => {
  const [clientData, setClientData] = useState<FieldValues>({})
  const [authErrors, setAuthErrors] = useState<AuthErrors>({})
  const [count, setCount] = useState(0)

  const navigate = useNavigate()

  const fetchData = async () => {
    setAuthErrors({})
    if (Object.keys(clientData).length > 0) {
      console.log('token', token)
      await axios.post("/clients", clientData)
        .then((res) => {
          alert("Cliente criado com sucesso.")
          navigate("/users")
          return
        })
        .catch((err) => {
          const errors = err.response.data
          setAuthErrors(errors)
          return
        })
    }
  }

  useEffect(() => {
    fetchData()                                      // eslint-disable-next-line
  }, [clientData, count]) 
  
  return (
    { setClientData, authErrors, setAuthErrors, count, setCount}
  )
}