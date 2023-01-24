import { AuthUserController } from './AuthUserController';
import { AuthUserUseCase } from './AuthUserUseCase';
import { makeUser } from './../../../../../test/factories/CreateUser-factory';
import { UsersRepositoryInMemory } from './../../database/mongo/repositories/inMemory/UsersRepositoryInMemory';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

describe('MyController', () => {
  let userRepository: UsersRepositoryInMemory;
  let authUserUseCase: AuthUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let authUserController: AuthUserController;
  let jwtService: JwtService;
  let user = makeUser()

  beforeEach(async () => {
    userRepository = new UsersRepositoryInMemory()
    jwtService = new JwtService()
    authUserUseCase = new AuthUserUseCase(
      userRepository,
      jwtService
    )
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
    authUserController = new AuthUserController(
      authUserUseCase
    )

    await createUserUseCase.execute(user)
  });

  describe('Auth User Controller', () => {

    it('shoud be able to authenticate a user',async () => {

      const result = await authUserController.signIn({
        email: user.email,
        password: 'test'
      })

      expect(result).toHaveProperty("token")
      
    });
    
  });
});