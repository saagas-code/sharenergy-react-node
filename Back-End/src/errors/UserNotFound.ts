
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class UserNotFound extends HttpException {
  constructor() {
    super ({username: "Usuário não encontrado", statusCode: 404}, HttpStatus.NOT_FOUND)
  }
}