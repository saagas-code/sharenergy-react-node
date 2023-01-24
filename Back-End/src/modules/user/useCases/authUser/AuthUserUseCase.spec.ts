import { AuthUserUseCase } from './AuthUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';


let userRepository: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let authUserUseCase: AuthUserUseCase
let jwtService: JwtService

let user = makeUser()

describe("Auth User UseCase", () => {
  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    jwtService = new JwtService()
    authUserUseCase = new AuthUserUseCase(
      userRepository,
      jwtService
    )
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
    
    await createUserUseCase.execute(user)
  })

  it("should be able to authenticate a user with correct email and password", async () => {
    
    const auth = await authUserUseCase.execute({
      email: user.email,
      password: 'test'
    })

    expect(auth).toHaveProperty("token")
  })

  it("should return error when try authenticate a user with wrong email or username", async () => {
    
    try {
      await authUserUseCase.execute({
        email: 'errado@gmail.com',
        password: 'errado'
      })
    } catch (err) {
      expect(err.response).toEqual("Email e/ou senha inválido.")
      expect(err.status).toEqual(409)
    }

    
  })

  it("should return error when try authenticate a user with wrong password", async () => {
    
    try {
      await authUserUseCase.execute({
        email: user.email,
        password: 'errado'
      })
    } catch (err) {
      expect(err.response).toEqual("Email e/ou senha inválido.")
      expect(err.status).toEqual(409)
    }

    
  })

})