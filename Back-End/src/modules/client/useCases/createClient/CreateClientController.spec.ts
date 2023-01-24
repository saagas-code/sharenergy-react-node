import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { CreateClientController } from './CreateClientController';
import { CreateClientUseCase } from './CreateClientUseCase';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';


describe('MyController', () => {
  let clientRepository: ClientsRepositoryInMemory;
  let userRepository: UsersRepositoryInMemory
  let createClientUseCase: CreateClientUseCase;
  let createUserUseCase: CreateUserUseCase;
  let createClientController: CreateClientController

  let client = makeClient()
  let user = makeUser()

  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
    createClientController = new CreateClientController(
      createClientUseCase
    )

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    await createUserUseCase.execute(user)
  });

  describe('Create Client Controller', () => {
    
    it('Should return a created client',async () => {
      const user = userRepository.users[0]
      const result = await createClientController.create(client, user)

      expect(result).toEqual(expect.objectContaining(client))
      expect(clientRepository.clients).toHaveLength(1)
    });
    
  });
});