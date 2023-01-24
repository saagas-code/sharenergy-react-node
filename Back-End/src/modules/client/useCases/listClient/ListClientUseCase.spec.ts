import { ListClientUseCase } from './ListClientUseCase';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';


let clientRepository: ClientsRepositoryInMemory;
let createClientUseCase: CreateClientUseCase;
let listClientUseCase: ListClientUseCase

let client = makeClient()
let client2 = makeClient({
  email: 'test2@gmail.com',
  cpf: '99999999999'
})

describe("List Client UseCase", () => {
  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
    listClientUseCase = new ListClientUseCase(
      clientRepository
    )
  })

  it("should return a list of client by a user_id", async () => {
    await createClientUseCase.execute(client, "_")
    await createClientUseCase.execute(client2, "_")
    const clients = clientRepository.clients

    const result = await listClientUseCase.execute("_", {page: 1, limit: 10, q: ''})

    expect(result.clients).toEqual(clients)
    expect(result.total).toEqual(2)
  })


})