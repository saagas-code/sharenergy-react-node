import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { ClientsRepositoryInMemory } from './../../database/mongo/repositories/inMemory/ClientsRepositoryInMemory';
import { ListClientController } from './ListClientController';
import { ListClientUseCase } from './ListClientUseCase';
import { makeClient } from './../../../../../test/factories/CreateClient-factory';
import { UsersRepositoryInMemory } from './../../../user/database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './../../../user/useCases/createUser/CreateUserUseCase';
import { CreateClientUseCase } from './../createClient/CreateClientUseCase';


describe('MyController', () => {
  let clientRepository: ClientsRepositoryInMemory;
  let userRepository: UsersRepositoryInMemory
  let createClientUseCase: CreateClientUseCase;
  let listClientUseCase: ListClientUseCase;
  let createUserUseCase: CreateUserUseCase;
  let listClientController: ListClientController

  let client = makeClient()
  let user = makeUser()

  beforeEach(async () => {
    clientRepository = new ClientsRepositoryInMemory()
    userRepository = new UsersRepositoryInMemory()
    listClientUseCase = new ListClientUseCase(
      clientRepository
    )
    createClientUseCase = new CreateClientUseCase(
      clientRepository
    )
    listClientController = new ListClientController(
      listClientUseCase
    )
    

    createUserUseCase = new CreateUserUseCase(
      userRepository
    )

    await createUserUseCase.execute(user)
    
  });

  describe('Create Client Controller', () => {

    const query =  {
      page: 1,
      limit: 1,
      q: ''
    }
    
    it('Should return a list of clients by a user_id',async () => {
      const newClient = await createClientUseCase.execute(client, "_")
      const user = userRepository.users[0]

      const result = await listClientController.list(query, {...user, _id: "_"})

      expect(result.clients[0]).toEqual(newClient)
      expect(result.total).toEqual(1)
    });
    
  });
});