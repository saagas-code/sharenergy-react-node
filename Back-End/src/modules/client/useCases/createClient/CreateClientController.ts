import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserViewHTTP } from 'src/modules/user/viewsModels/ListUserView';
import { CreateClientDTO } from '../../DTOs/CreateClientDTO';
import { CreateClientUseCase } from './CreateClientUseCase';
import { GetUser } from './../../../user/decorators/user.decorator';


export interface CreateUserDTO {
  username: string,
  fullname: string
  email: string,
  password: string
}

@Controller("/clients")
@UseGuards(AuthGuard('jwt'))

export class CreateClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
  ) {}
  
  @Post("/")
  async create(@Body() body: CreateClientDTO, @GetUser() user: IUserViewHTTP){

    const client = await this.createClientUseCase.execute(body, user._id)
    return client

  }

}