
import { RandomUsers } from './../../interfaces/RandomUsers';
import { apiRandom } from './index';

export interface RandomUsersAPI {
  info: {
    seed: string;
    results: number;
    page: number;
  },
  results: RandomUsers[]
}

export const getRandomUsers = async (results: number) => {
  const {data} = await apiRandom.get(`/?results=${results}`)
  return data
}