import { CreateClientUseCase } from './CreateClientUseCase';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';


let clientRepository: ClientsRepositoryInMemory
let createClientUseCase: CreateClientUseCase

let client = makeClient()

describe("Create User UseCase", () => {
  beforeEach(() => {
    clientRepository = new ClientsRepositoryInMemory()
    createClientUseCase = new CreateClientUseCase(
      clientRepository,
    )
  })

  it("should be able to create a user", async () => {
    const newClient = await createClientUseCase.execute(client, '_')
    const clients = clientRepository.clients

    expect(clients).toHaveLength(1)
    expect(newClient).toEqual(expect.objectContaining(client))
  })

  it("return error when email already exists", async () => {
    const user = makeClient({email: 'teste@gmail.com'})
    await createClientUseCase.execute(user, '_')

    try {
      await createClientUseCase.execute(user, '_')
    } catch (err) {
      expect(err.response).toHaveProperty('email', 'Email já existente')
      expect(err.status).toEqual(409)
    }

  })

  it("return error when cpf already exists", async () => {
    const client2 = makeClient({
      email: 'teste333@gmail.com',
      cpf: '00000000000'
    })
    await createClientUseCase.execute(client, '_')

    try {
      await createClientUseCase.execute(client2, '_')
    } catch (err) {
      expect(err.response).toHaveProperty('cpf', 'Cpf já existente')
      expect(err.status).toEqual(409)
    }

  })

})