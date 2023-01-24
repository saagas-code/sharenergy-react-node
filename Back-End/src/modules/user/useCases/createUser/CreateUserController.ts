import { Controller, Post, Body } from '@nestjs/common';
import { IUserViewHTTP, UserViewModel } from '../../viewsModels/ListUserView';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ApiTags } from '@nestjs/swagger';

export interface CreateUserDTO {
  username: string,
  fullname: string
  email: string,
  password: string
}

@ApiTags("User")
@Controller("/users")
export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}
  
  @Post("/")
  async create(@Body() body: CreateUserDTO): Promise<Partial<IUserViewHTTP>> {

    const user = await this.createUserUseCase.execute(body)

    return UserViewModel.toHTTP(user)
  }

}