import { Controller, UseGuards, Get, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FindClientUseCase } from './FindClientUseCase';
import { GetUser } from './../../../user/decorators/user.decorator';
import { IUserViewHTTP } from '../../../../modules/user/viewsModels/ListUserView';



interface IParams {
  id: string
}

@Controller("/clients")
@UseGuards(AuthGuard('jwt'))
export class FindClientController {
  constructor(
    private findClientUseCase: FindClientUseCase,
  ) {}
  
  @Get("/:id")
  async find(@GetUser() user: IUserViewHTTP, @Param() params: IParams) {

    const client = await this.findClientUseCase.execute(user._id, params.id)
    return client

  }

}