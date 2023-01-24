import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { DeleteClientController } from './DeleteClientController';
import { DeleteClientUseCase } from './DeleteClientUseCase';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';


describe('MyController', () => {
  let clientRepository: ClientsRepositoryInMemory;
  let userRepository: UsersRepositoryInMemory
  let createClientUseCase: CreateClientUseCase
  let createUserUseCase: CreateUserUseCase;
  let deleteClientUseCase: DeleteClientUseCase;
  let deleteClientController: DeleteClientController

  let client = makeClient()
  let user = makeUser()

  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    deleteClientUseCase = new DeleteClientUseCase(
      clientRepository
    )
    deleteClientController = new DeleteClientController(
      deleteClientUseCase
    )

    await createUserUseCase.execute(user)
  });

  describe('Delete Client Controller', () => {
    
    it('Should delete a client',async () => {
      const newClient = await createClientUseCase.execute(client, "_")
      expect(clientRepository.clients).toHaveLength(1)
      const user = userRepository.users[0]
      const result = await deleteClientController.delete({id: newClient._id}, {...user, _id: "_"})

      expect(result).toBe(undefined)
      expect(clientRepository.clients).toHaveLength(0)
    });
    
  });
});