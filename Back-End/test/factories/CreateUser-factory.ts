
import { User } from './../../src/modules/user/entities/User';


type Override = Partial<User>

export function makeUser(override: Override = {})  {
  const newUser =  new User()
  Object.assign(newUser, {
    username: 'test',
    fullname: 'test test',
    email: 'test@gmail.com',
    password: 'test',
    clients: [],
    ...override
  })
  return newUser
}

