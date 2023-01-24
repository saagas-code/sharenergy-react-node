import { DeleteUserUseCase } from './DeleteUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';

let userRepository: UsersRepositoryInMemory
let deleteUserUseCase: DeleteUserUseCase
let user = makeUser()

describe("Delete User", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    deleteUserUseCase = new DeleteUserUseCase(
      userRepository
    )
    userRepository.create(user)
  })

  it("should be able to delete a user", async () => {
    const users = userRepository.users
    expect(users).toHaveLength(1)

    await deleteUserUseCase.execute(users[0]._id)

    expect(userRepository.users).toHaveLength(0)
  })

  it("return error when user id not found", async () => {
    try {
      await deleteUserUseCase.execute('idTeste')
    } catch (err) {
      expect(err.response).toHaveProperty("username", "Usuário não encontrado")
      expect(err.status).toEqual(404)
    }
  })

})