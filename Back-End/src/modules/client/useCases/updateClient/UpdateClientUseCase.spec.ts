import { UpdateClientUseCase } from './UpdateClientUseCase';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';



let clientRepository: ClientsRepositoryInMemory
let createClientUseCase: CreateClientUseCase
let updateClientUseCase: UpdateClientUseCase

let client = makeClient()
const newData = {
  name: 'updated',
  email: 'updated@gmail.com',
  phone: '21988198728',
  address: 'Changed',
  cpf: '99988877719'
}

describe("Update User UseCase", () => {
  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
    updateClientUseCase = new UpdateClientUseCase(
      clientRepository,
    )

    
  })

  it("should be able to update a client", async () => {
    const newClient = await createClientUseCase.execute(client, '_')

    const updatedClient = await updateClientUseCase.execute("_", newClient._id, newData)
    expect(updatedClient).toEqual(expect.objectContaining(newData))
  })

  it("return error when a client not found", async () => {

    try {
      await updateClientUseCase.execute("_", "wrongId", newData)
    
    } catch (err) {
      expect(err.response).toHaveProperty("client", "Client não encontrado")
      expect(err.status).toEqual(404)
    }

  })

  it("return error when a email already exists", async () => {
    const newClient = await createClientUseCase.execute(client, '_')

    try {
      await updateClientUseCase.execute("_", newClient._id , {...newData, email: 'test@gmail.com'})
    } catch (err) {
      expect(err.response).toHaveProperty("email", "Email já existente")
      expect(err.status).toEqual(409)
    }

  })

  it("return error when a cpf already exists", async () => {
    const newClient = await createClientUseCase.execute(client, '_')

    try {
      await updateClientUseCase.execute("_", newClient._id, {...newData, cpf: '00000000000'})
    
    } catch (err) {
      expect(err.response).toHaveProperty("cpf", "Cpf já existente")
      expect(err.status).toEqual(409)
    }

  })

})