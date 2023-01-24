
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class ClientNotFound extends HttpException {
  constructor() {
    super ({client: "Client não encontrado", statusCode: 404}, HttpStatus.NOT_FOUND)
  }
}