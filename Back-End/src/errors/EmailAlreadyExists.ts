
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class EmailAlreadyExists extends HttpException {
  constructor() {
    super ({email: "Email já existente", statusCode: 409}, HttpStatus.CONFLICT)
  }
}