import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ensureAdmin } from '../../../../common/guards/ensureAdmin.guard';
import { IUserViewHTTP, UserViewModel } from '../../viewsModels/ListUserView';
import { ListUserUseCase } from './ListUserUseCase';
import { ApiTags } from '@nestjs/swagger';


export interface IListUserQuery {
  page: number;
  limit: number;
  q: string
}

@ApiTags("User")
@Controller("/users")
@UseGuards(AuthGuard('jwt'))
export class ListUserController {
  constructor(
    private listUserUseCase: ListUserUseCase,
  ) {}
  
  @Get("/")
  @UseGuards(ensureAdmin)
  async list(@Query() query: IListUserQuery): Promise<{users: IUserViewHTTP[], total: number}> {

    let result = await this.listUserUseCase.execute(query)
    const viewUsers = result.users.map(UserViewModel.toHTTP)
    return {users: viewUsers, total: result.total}
  }

}