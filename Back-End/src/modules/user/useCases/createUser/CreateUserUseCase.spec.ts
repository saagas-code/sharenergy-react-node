import { CreateUserUseCase } from './CreateUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { HttpException } from '@nestjs/common/exceptions';

let userRepository: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Create User UseCase", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
  })

  it("should be able to create a user", async () => {
    const user = makeUser()
    await createUserUseCase.execute(user)

    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0]).toEqual(expect.objectContaining(user))
  })

  it("return error when email or username already exists", async () => {
    const user = makeUser({email: 'teste@gmail.com'})
    await createUserUseCase.execute(user)

    try {
      await createUserUseCase.execute(user)
    } catch (err) {
      expect(err.response).toHaveProperty('email', 'Email Already Exists')
      expect(err.response).toHaveProperty('username', 'Username Already Exists')
      expect(err.status).toEqual(409)
    }

  })

})