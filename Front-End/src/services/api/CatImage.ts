import { api } from "."

export const getCatImage = async (code: string) => {
  const {data} = await api.get(`https://http.cat/${code}`)
  return data
}