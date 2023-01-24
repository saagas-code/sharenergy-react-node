
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

export class CpfAlreadyExists extends HttpException {
  constructor() {
    super ({cpf: "Cpf já existente", statusCode: 409}, HttpStatus.CONFLICT)
  }
}