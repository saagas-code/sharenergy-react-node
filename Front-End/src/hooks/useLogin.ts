
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../contexts/AuthProvider';
import { saveToken, saveData, removeData } from './../helpers/saveLocalStorage';
import  axios  from 'axios';

export interface loginData {
  email: string;
  password: string;
  remember: boolean;
}

export const useLogin = () => {
  const [loginData, setLoginData] = useState<FieldValues>({})
  const [authError, setAuthError] = useState('')
  const {validateToken} = useContext(AuthContext)

  const navigate = useNavigate()

  const fetchData = async ({email, password, remember}: FieldValues) => {
    setAuthError('')

    if (Object.keys(loginData).length > 0) {
      await axios.post("/auth/login", {email, password})
        .then(({data: {token}}) => {
          if (remember) {
            saveData(email, password)
          } else {
            removeData()
          }

          saveToken(token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          validateToken()
          navigate("/home")
        })

        .catch((err) => {
          const error = err.response.data
          setAuthError(error.message)
        })
    }
  }

  useEffect(() => { 
    fetchData(loginData)
  }, [loginData]) 
  
  return (
    {setLoginData, authError}
  )
}