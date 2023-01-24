import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { FindClientController } from './FindClientController';
import { FindClientUseCase } from './FindClientUseCase';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';


describe('MyController', () => {
  let clientRepository: ClientsRepositoryInMemory;
  let userRepository: UsersRepositoryInMemory
  let createClientUseCase: CreateClientUseCase;
  let findClientUseCase: FindClientUseCase;
  let createUserUseCase: CreateUserUseCase;
  let findClientController: FindClientController

  let client = makeClient()
  let user = makeUser()

  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()
    findClientUseCase = new FindClientUseCase(
      clientRepository
    )
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
    findClientController = new FindClientController(
      findClientUseCase
    )
    

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    await createUserUseCase.execute(user)
    
  });

  describe('Create Client Controller', () => {

    
    it('Should return a finded client',async () => {
      const newClient = await createClientUseCase.execute(client, "_")
      const user = userRepository.users[0]

      const result = await findClientController.find({...user, _id: "_"}, {id: newClient._id})
      expect(result).toEqual(newClient)
    });
    
  });
});