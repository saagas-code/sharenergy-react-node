
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class EmailOrPassWrong extends HttpException {
  constructor() {
    super ("Email e/ou senha inválido.", HttpStatus.CONFLICT)
  }
}