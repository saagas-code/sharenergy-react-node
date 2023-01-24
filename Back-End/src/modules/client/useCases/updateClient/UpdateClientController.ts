import { Controller, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateClientDTO } from '../../DTOs/UpdateClientDTO';
import { UpdateClientUseCase } from './UpdateClientUseCase';
import { ensureAdminOrMyClient } from '../../ensureAdminOrMyClient.guard';
import { GetUser } from './../../../user/decorators/user.decorator';
import { IUserViewHTTP } from '../../../../modules/user/viewsModels/ListUserView';



interface IPayload {
  id: string
}

@Controller("/clients")
@UseGuards(AuthGuard('jwt'))
export class UpdateClientController {
  constructor(
    private updateClientUseCase:  UpdateClientUseCase,
  ) {}
  
  @Patch("/:id")
  @UseGuards(ensureAdminOrMyClient)
  async update(@Body() body: UpdateClientDTO, @Param() param: IPayload, @GetUser() user: IUserViewHTTP) {

    let userr = await this.updateClientUseCase.execute(user._id, param.id, body)
    return userr
  }

}