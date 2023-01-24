import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { ListClientUseCase } from './ListClientUseCase';
import { GetUser } from './../../../user/decorators/user.decorator';
import { IUserViewHTTP } from '../../../user/viewsModels/ListUserView';

export interface IListClientQuery {
  page: number;
  limit: number;
  q: string
}

export interface CreateUserDTO {
  username: string,
  fullname: string
  email: string,
  password: string
}

@Controller("/clients")
@UseGuards(AuthGuard('jwt'))
export class ListClientController {
  constructor(
    private listClientUseCase: ListClientUseCase,
  ) {}
  
  @Get("/")
  async list(@Query() query: IListClientQuery, @GetUser() user: IUserViewHTTP) {

    const client = await this.listClientUseCase.execute(user._id, query)
    return client

  }

}