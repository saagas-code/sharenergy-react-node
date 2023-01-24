import { RequestUserController } from './RequestUserController';
import { RequestUserUseCase } from './RequestUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { UserViewModel } from '../../viewsModels/ListUserView';
import { CreateUserUseCase } from './../createUser/CreateUserUseCase';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase
  let requestUserUseCase: RequestUserUseCase;
  let requestUserController: RequestUserController
  let user = makeUser()
  let user2 = makeUser({
    email: 'teste2@gmail.com',
    username: 'teste2'
  })

  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
    requestUserUseCase = new RequestUserUseCase(
      userRepository
    )
    requestUserController = new RequestUserController(
      requestUserUseCase
    )

    await createUserUseCase.execute(user)
    await createUserUseCase.execute(user2)
  });

  describe('Request User Controller', () => {
    it('Should return a created user',async () => {
      const user = userRepository.users[0]
      const result = await requestUserController.request(UserViewModel.toHTTP(user))

      
      expect(result).toEqual(UserViewModel.toHTTP(user))

    });
    
  });
});