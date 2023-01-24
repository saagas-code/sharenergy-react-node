import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  let createUserController: CreateUserController


  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
    createUserController = new CreateUserController(
      createUserUseCase
    )
  });

  describe('Create User Controller', () => {
    it('Should return a created user',async () => {
      const user = makeUser()
      const result = await createUserController.create(user)
      expect(result).toHaveProperty("_id")
      expect(result).toHaveProperty("email", 'test@gmail.com')
    });
    
  });
});