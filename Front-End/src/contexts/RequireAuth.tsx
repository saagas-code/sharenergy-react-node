


import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';


export const RequireAuth = ({ children}: {children: JSX.Element}) => {
  const {user} = useContext(AuthContext);

  if(!user) {
    return <Navigate to="/" />
  }

  return children
}