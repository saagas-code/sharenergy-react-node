import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { UserViewModel } from '../../viewsModels/ListUserView';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let updateUserUseCase: UpdateUserUseCase;
  let updateUserController: UpdateUserController
  let user = makeUser()

  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    updateUserUseCase = new UpdateUserUseCase(
      userRepository
    )
    updateUserController = new UpdateUserController(
      updateUserUseCase
    )

    await userRepository.create(user)
  });

  describe('Update User Controller', () => {
    it('Should return a created user',async () => {
      const users = userRepository.users
      const userId = users[0]._id
      const newData = {
        username: 'testado',
        fullname: 'testado',
        email: 'testado@gmail.com',
        password: 'testado',
      }

      const result = await updateUserController.update(newData, {id: userId})

      expect(result).toEqual(expect.objectContaining(
        UserViewModel.toHTTP(users[0])
      ))
      
    });
    
  });
});