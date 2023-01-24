
import { encryptData } from './crypt';

export const getLocal = (text: string) => {
  return localStorage.getItem(text)
}

export const removeLocal = (text: string) => {
  return localStorage.removeItem(text)
}

export const saveToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const removeToken = () => {
  localStorage.removeItem("token")
}

export const saveData = (email: string, password: string) => {
  localStorage.setItem("email", encryptData(email))
  localStorage.setItem("password", encryptData(password))
}

export const removeData = () => {
  localStorage.removeItem("email")
  localStorage.removeItem("password")
}