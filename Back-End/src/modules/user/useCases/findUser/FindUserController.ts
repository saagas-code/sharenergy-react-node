import { Controller, Get, Param } from '@nestjs/common';
import { IUserViewHTTP, UserViewModel } from '../../viewsModels/ListUserView';
import { ApiTags } from '@nestjs/swagger';
import { FindUserUseCase } from './FindUserUseCase';


interface IPayload {
  id: string
}

@ApiTags("User")
@Controller("/users")
export class FindUserController {
  constructor(
    private findUserUseCase: FindUserUseCase,
  ) {}
  
  @Get("/:id")
  async find(@Param() param: IPayload): Promise<IUserViewHTTP> {
    let user = await this.findUserUseCase.execute(param.id)
    return UserViewModel.toHTTP(user)
   
  }

}