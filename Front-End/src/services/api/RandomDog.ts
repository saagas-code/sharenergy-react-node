import axios from "axios"


export const getRandomDog = async () => {
  const {data} = await axios.get(`https://random.dog/woof.json?include=jpg,giff`)
  return data
}