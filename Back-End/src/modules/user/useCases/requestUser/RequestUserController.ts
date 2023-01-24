import { Controller, Post, Param, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserViewHTTP, UserViewModel } from '../../viewsModels/ListUserView';
import { RequestUserUseCase } from './RequestUserUseCase';
import { GetUser } from './../../decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller("/auth")
@UseGuards(AuthGuard('jwt'))
export class RequestUserController {
  constructor(
    private requestUserUseCase: RequestUserUseCase,
  ) {}
  
  @Get("/session")
  async request(@GetUser() user: IUserViewHTTP) {

    const userr = await this.requestUserUseCase.execute(user._id)

    return UserViewModel.toHTTP(userr)
  }

}