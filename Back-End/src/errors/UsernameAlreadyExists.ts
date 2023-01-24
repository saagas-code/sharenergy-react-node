
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class UsernameAlreadyExists extends HttpException {
  constructor() {
    super ({username: "Username já existente", statusCode: 409}, HttpStatus.CONFLICT)
  }
}