import { ListUserUseCase } from './ListUserUseCase';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';


let userRepository: UsersRepositoryInMemory
let listUserUseCase: ListUserUseCase
let user = makeUser()
let user2 = makeUser({
  email: 'teste2@gmail.com',
  username: 'teste2'
})

describe("List User UseCase", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    listUserUseCase = new ListUserUseCase(
      userRepository
    )
    userRepository.create(user)
    userRepository.create(user2)
  })

  it("should return many users", async () => {
    const users = userRepository.users
    const result = await listUserUseCase.execute({
      page: 1,
      limit: 10,
      q: ''
    })
    expect(result.users).toHaveLength(2)
    expect(result.total).toEqual(2)
    expect(result.users).toEqual(users)
  })

})