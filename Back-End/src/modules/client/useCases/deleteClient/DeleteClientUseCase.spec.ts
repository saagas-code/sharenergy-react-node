import { DeleteClientUseCase } from './DeleteClientUseCase';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';



let clientRepository: ClientsRepositoryInMemory
let createClientUseCase: CreateClientUseCase
let deleteClientUseCase: DeleteClientUseCase

let client = makeClient()

describe("Delete User UseCase", () => {
  beforeEach(() => {
    clientRepository = new ClientsRepositoryInMemory()
    deleteClientUseCase = new DeleteClientUseCase(
      clientRepository,
    )
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
  })

  it("should be able to delete a client", async () => {
    const newClient = await createClientUseCase.execute(client, '_')
    const clients = clientRepository.clients
    expect(clients).toHaveLength(1)

    await deleteClientUseCase.execute("_", newClient._id)
    expect(clientRepository.clients).toHaveLength(0)
  })

  it("return error when client id not found", async () => {
    await createClientUseCase.execute(client, '_')

    try {
      await deleteClientUseCase.execute("_", 'wrongClientId')
    } catch (err) {
      expect(err.response).toHaveProperty('client', 'Client não encontrado')
      expect(err.status).toEqual(404)
    }

  })

})