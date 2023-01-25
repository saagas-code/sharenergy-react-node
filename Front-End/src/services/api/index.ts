
import  axios  from 'axios';

const PORT = process.env.REACT_APP_PORT_BACK || 8819
axios.defaults.baseURL = `http://localhost:${PORT}`
axios.defaults.headers.common = {"Access-Control-Allow-Origin": "*"}

export const getRandomUsers = async (results: number) => {
  const {data} = await axios.get(`https://randomuser.me/api/?results=${results}`)
  return data
}

export const getRandomDog = async () => {
  const {data} = await axios.get(`https://random.dog/woof.json?include=jpg,giff`)
  return data
}