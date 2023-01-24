import { FindClientUseCase } from './FindClientUseCase';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';


let clientRepository: ClientsRepositoryInMemory;
let createClientUseCase: CreateClientUseCase;
let findClientUseCase: FindClientUseCase

let client = makeClient()

describe("Find Client UseCase", () => {
  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
    findClientUseCase = new FindClientUseCase(
      clientRepository
    )
  })

  it("should return a client by a id", async () => {
    const newClient = await createClientUseCase.execute(client, "_")

    const findedClient = await findClientUseCase.execute("_", newClient._id)

    expect(newClient).toEqual(findedClient)
  })

  it("return error when client not found", async () => {

    try {
      await findClientUseCase.execute("_", 'wrongId')
    } catch (err) {
      expect(err.response).toHaveProperty('client', 'Client não encontrado')
      expect(err.status).toEqual(404)
    }

  })

})