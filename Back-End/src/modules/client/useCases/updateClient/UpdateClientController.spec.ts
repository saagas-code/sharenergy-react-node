import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { UpdateClientController } from './UpdateClientController';
import { UpdateClientUseCase } from './UpdateClientUseCase';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { CreateClientUseCase } from '../createClient/CreateClientUseCase';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';


describe('MyController', () => {
  let clientRepository: ClientsRepositoryInMemory;
  let userRepository: UsersRepositoryInMemory
  let createUserUseCase: CreateUserUseCase;
  let createClientUseCase: CreateClientUseCase;
  let updateClientUseCase: UpdateClientUseCase;
  let updateClientController: UpdateClientController

  let client = makeClient()
  let user = makeUser()

  const newData = {
    name: 'updated',
    email: 'updated@gmail.com',
    phone: '21988198728',
    address: 'Changed',
    cpf: '99988877719'
  }

  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )

    updateClientUseCase = new UpdateClientUseCase(
      clientRepository
    )
    updateClientController = new UpdateClientController(
      updateClientUseCase
    )


    await createUserUseCase.execute(user)
  });

  describe('Update Client Controller', () => {
    
    it('Should Update a client',async () => {
      const newClient = await createClientUseCase.execute(client, "_")
      const user = userRepository.users[0]


      const result = await updateClientController.update(newData, {id: newClient._id}, {...user, _id: "_"})
      expect(result).toEqual(expect.objectContaining(newData))
    });
    
  });
});