
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class UserIsNotAdmin extends HttpException {
  constructor() {
    super ("Usuário logado não é um administrador", HttpStatus.FORBIDDEN)
  }
}