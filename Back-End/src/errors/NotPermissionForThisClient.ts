
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class NotPermissionForThisClient extends HttpException {
  constructor() {
    super ("Você não tem permissão para editar este cliente", HttpStatus.FORBIDDEN)
  }
}