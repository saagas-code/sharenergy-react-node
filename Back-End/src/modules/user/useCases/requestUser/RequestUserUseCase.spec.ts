import { RequestUserUseCase } from './RequestUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';


let userRepository: UsersRepositoryInMemory
let requestUserUseCase: RequestUserUseCase
let user = makeUser()

describe("Request User UseCase", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    requestUserUseCase = new RequestUserUseCase(
      userRepository
    )
    userRepository.create(user)
  })

  it("should a user by id", async () => {
    const user = userRepository.users[0]
    const userId = user._id

    const result = await requestUserUseCase.execute(userId)
    expect(result).toEqual(user)
  })

  it("should return error when user id not found", async () => {
    try {
      await requestUserUseCase.execute('erro')
    } catch (err) {
      expect(err.response).toHaveProperty("username", 'Usuário não encontrado')
      expect(err.status).toEqual(404)
    }
  })

})