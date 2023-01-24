import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from './../services/api/index';
import { removeToken } from './../helpers/saveLocalStorage';
import { useNavigate } from 'react-router-dom';
import { User } from "../interfaces/User";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderContextProps {
  user: User | null;
  isLoading: boolean
  validateToken: () => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthProviderContextProps>(
  {} as AuthProviderContextProps
)

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const validateToken = async () => {
    const token =  localStorage.getItem("token")
    const config = {
      headers: {
        'Authorization': 'Bearer ' +token
      }
    }
    
    setIsLoading(true)
    await api.get("/auth/session", config)
      .then(({data}) => {
        setUser(data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const logout = () => {
    removeToken()
    navigate("/")
  }

  useEffect(() => {
    validateToken()
  }, [])

  return (
    <AuthContext.Provider value={{user, isLoading, validateToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
  
}