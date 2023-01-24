
import  axios  from 'axios';

const PORT = process.env.REACT_APP_PORT_BACK || 8819

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`

  return config
})

const token =  localStorage.getItem("token")
export const config = {
  headers: {
    'Authorization': 'Bearer ' +token
  }
}



export const header = (token: string) => {
  return {
    config: {
      headers: { Authorization: `Bearer ${token}` }
    }
  }
}

export const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
  // headers: { Authorization: `Bearer ${token}` }
});

export const apiRandom = axios.create({
  baseURL: "https://randomuser.me/api",
  // headers: { Authorization: `Bearer ${token}` }
});
