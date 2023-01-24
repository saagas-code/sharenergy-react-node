import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { IUsersRepository } from "../../database/implements/IUsersRepository";
import { AuthUserDTO } from "../../DTOs/AuthUserDTO";
import { EmailOrPassWrong } from './../../../../errors/EmailOrPassWrong';

interface IResponse {
  // id: string,
  token: string
}

@Injectable()
export class AuthUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private jwt: JwtService
  ) {}

  async execute({email, password}: AuthUserDTO): Promise <IResponse> {

    const user = await this.userRepository.findByUsernameOrEmail(email)

    if(!user) {
      throw new EmailOrPassWrong()
    }

    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) {
      throw new EmailOrPassWrong()
    }
    
    const token = this.jwt.sign({
      sub: user._id,
      id: user._id
    }, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET_KEY as string || '8819'
    });

    const response: IResponse = {
      token
    }
    
    return response
  }
}