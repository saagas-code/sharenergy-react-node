import { Controller, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ensureAdminOrMyClient } from '../../ensureAdminOrMyClient.guard';
import { DeleteClientUseCase } from './DeleteClientUseCase';
import { IUserViewHTTP } from '../../../user/viewsModels/ListUserView';
import { GetUser } from './../../../user/decorators/user.decorator';


interface IPayload {
  id: string
}

@Controller("/clients")
@UseGuards(AuthGuard('jwt'))
export class DeleteClientController {
  constructor(
    private deleteClientUseCase:  DeleteClientUseCase,
  ) {}
  
  @Delete("/:id")
  @UseGuards(ensureAdminOrMyClient)
  async delete(@Param() param: IPayload, @GetUser() user: IUserViewHTTP) {

    let userr = await this.deleteClientUseCase.execute(user._id, param.id)
    return userr

  }

}