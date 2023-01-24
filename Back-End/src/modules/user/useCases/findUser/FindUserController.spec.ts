import { FindUserController } from './FindUserController';
import { FindUserUseCase } from './FindUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { UserViewModel } from '../../viewsModels/ListUserView';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let findUserUseCase: FindUserUseCase;
  let findUserController: FindUserController
  let user = makeUser()

  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    findUserUseCase = new FindUserUseCase(
      userRepository
    )
    findUserController = new FindUserController(
      findUserUseCase
    )

    await userRepository.create(user)
  });

  describe('Find User Controller', () => {
    it('Should return a created user',async () => {
      const users = userRepository.users
      const result = await findUserController.find({id: users[0]._id})

      expect(result).toEqual(expect.objectContaining(
        UserViewModel.toHTTP(users[0])
      ))
      
    });
    
  });
});