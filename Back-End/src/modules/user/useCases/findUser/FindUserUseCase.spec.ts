import { FindUserUseCase } from './FindUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';


let userRepository: UsersRepositoryInMemory
let findUserUseCase: FindUserUseCase
let user = makeUser()

describe("Find User UseCase", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    findUserUseCase = new FindUserUseCase(
      userRepository
    )
    userRepository.create(user)
  })

  it("should return one user by _id", async () => {
    const user = await userRepository.users
    const result = await findUserUseCase.execute(user[0]._id)

    expect(result).toEqual(expect.objectContaining(user[0]))
  })

  it("return error when user _id not found", async () => {

    try {
      await findUserUseCase.execute('idTest')
    } catch (err) {
      expect(err.response).toHaveProperty("username", "Usuário não encontrado")
      expect(err.status).toEqual(404)
    }

  })

})