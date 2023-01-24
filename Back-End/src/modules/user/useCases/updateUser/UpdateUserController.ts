import { Controller, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { UpdateUserDTO } from '../../DTOs/UpdateUserDTO';
import { UserViewModel } from '../../viewsModels/ListUserView';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { AuthGuard } from '@nestjs/passport';
import { IUserViewHTTP } from './../../viewsModels/ListUserView';
import { ensureAdminOrSelf } from './../../../../common/guards/ensureAdminOrSelf.guard';
import { ApiTags } from '@nestjs/swagger';


interface IPayload {
  id: string
}

@ApiTags("User")
@Controller("/users")
@UseGuards(AuthGuard('jwt'))
export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) {}
  
  @Patch("/:id")
  @UseGuards(ensureAdminOrSelf)
  async update(@Body() body: UpdateUserDTO, @Param() param: IPayload): Promise<IUserViewHTTP> {

    let user = await this.updateUserUseCase.execute(param.id, body)
    
    return UserViewModel.toHTTP(user)
  }

}