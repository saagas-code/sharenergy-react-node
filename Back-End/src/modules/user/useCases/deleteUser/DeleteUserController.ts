import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { AuthGuard } from '@nestjs/passport';
import { ensureAdminOrSelf } from '../../../../common/guards/ensureAdminOrSelf.guard';

interface IPayload {
  id: string
}

@Controller("/users")
@UseGuards(AuthGuard('jwt'))
export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}
  
  @Delete("/:id")
  @UseGuards(ensureAdminOrSelf)
  async delete(@Param() param: IPayload): Promise<void> {
    await this.deleteUserUseCase.execute(param.id)
   
  }

}