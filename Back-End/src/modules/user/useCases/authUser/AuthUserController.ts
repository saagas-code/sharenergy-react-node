import { Controller, Get, Post, Body, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDTO } from '../../DTOs/AuthUserDTO';


import { AuthUserUseCase } from './AuthUserUseCase';
import { ApiTags } from '@nestjs/swagger';

interface IResponse {
  token: string
}
@ApiTags("Auth")
@Controller("/auth")
export class AuthUserController {
  constructor(
    private authUserUseCase: AuthUserUseCase,
  ) {}
  
  @Post("/login")
  async signIn(@Body() body: AuthUserDTO): Promise<IResponse> {
    const {email, password, } = body

    const token = await this.authUserUseCase.execute({
      email, password
    })

    return token
  }

}