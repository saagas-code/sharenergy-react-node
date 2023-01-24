import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';


let userRepository: UsersRepositoryInMemory
let updateUserUseCase: UpdateUserUseCase
let user = makeUser()

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    updateUserUseCase = new UpdateUserUseCase(
      userRepository
    )
    userRepository.create(user)
  })

  it("should update one user by a _id", async () => {
    const users = userRepository.users
    const userId = users[0]._id

    const newData = {
      username: 'testado',
      fullname: 'testado',
      email: 'testado@gmail.com',
      password: 'testado',
    }
    const result = await updateUserUseCase.execute(userId, newData)
    expect(result).toEqual(expect.objectContaining(newData))
  })

  it("shoud return error if a new email already exists", async () => {
    const users = userRepository.users
    const userId = users[0]._id

    try {
      await updateUserUseCase.execute(userId, {
        email: 'test@gmail.com'
      })
    } catch (err) {
      expect(err.response).toHaveProperty('email', 'Email já existente')
      expect(err.status).toEqual(409)
    }

  })

  it("shoud return error if a new username already exists", async () => {
    const users = userRepository.users
    const userId = users[0]._id

    try {
      await updateUserUseCase.execute(userId, {
        username: 'test'
      })
    } catch (err) {
      expect(err.response).toHaveProperty('username', 'Username já existente')
      expect(err.status).toEqual(409)
    }

  })

})