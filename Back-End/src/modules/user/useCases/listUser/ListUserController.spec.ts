import { ListUserController } from './ListUserController';
import { ListUserUseCase } from './ListUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { UserViewModel } from '../../viewsModels/ListUserView';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let listUserUseCase: ListUserUseCase;
  let listUserController: ListUserController
  let user = makeUser()
  let user2 = makeUser({
    email: 'teste2@gmail.com',
    username: 'teste2'
  })

  beforeEach( () => {
    userRepository = new UsersRepositoryInMemory()
    listUserUseCase = new ListUserUseCase(
      userRepository
    )
    listUserController = new ListUserController(
      listUserUseCase
    )

    userRepository.create(user)
    userRepository.create(user2)
  });

  describe('List User Controller', () => {
    it('Should return a created user',async () => {
      const users = userRepository.users
      const result = await listUserController.list({
        page: 1,
        limit: 10,
        q: ''
      })

      expect(result.users).toHaveLength(2)
      expect(result.total).toEqual(2)
      expect(result.users[0]).toEqual(expect.objectContaining(UserViewModel.toHTTP(users[0])))
      
    });
    
  });
});