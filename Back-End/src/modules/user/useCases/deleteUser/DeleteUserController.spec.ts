import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let deleteUserUseCase: DeleteUserUseCase;
  let deleteUserController: DeleteUserController
  let user = makeUser()

  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    deleteUserUseCase = new DeleteUserUseCase(
      userRepository
    )
    deleteUserController = new DeleteUserController(
      deleteUserUseCase
    )

    await userRepository.create(user)
  });

  describe('Delete User Controller', () => {
    it('Should return a created user',async () => {
      const users = userRepository.users
      expect(users).toHaveLength(1)

      await deleteUserController.delete({id: users[0]._id})
      expect(userRepository.users).toHaveLength(0)
      
    });
    
  });
});