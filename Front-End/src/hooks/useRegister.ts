import { useState } from 'react';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';


interface AuthErrors {
  email?: string,
  username?: string
}

export const useRegister = () => {
  const [registerData, setRegisterData] = useState<FieldValues>({})
  const [authErrors, setAuthErrors] = useState<AuthErrors>({})
  const [count, setCount] = useState(0)

  const navigate = useNavigate()

  const fetchData = async () => {
    setAuthErrors({})
    if (Object.keys(registerData).length > 0) {
      await axios
        .post("/users", registerData)
        .then((res) => {
          alert("Conta registrada com sucesso !")
          navigate("/")
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
  }, [registerData, count]) 
  
  return (
    { setRegisterData, authErrors, setAuthErrors, count, setCount}
  )
}