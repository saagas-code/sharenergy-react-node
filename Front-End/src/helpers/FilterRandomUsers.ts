
import { RandomUsers } from './../interfaces/RandomUsers';

interface Props {
  users: RandomUsers[];
  search: string
}

export const FilterRandomUsers = ({users, search}: Props) => {
  search = search.toLocaleLowerCase()
  
  const filteredUsers = users.filter((user) => {
    if(user.email.toLowerCase().includes(search)) {
      return user
    }
    const name = `${user.name.first} ${user.name.last}`
    if(name.toLowerCase().includes(search)) {
      return user
    }
    if(user.login.username.toLowerCase().includes(search)) {
      return user
    }
  })
  return filteredUsers
}