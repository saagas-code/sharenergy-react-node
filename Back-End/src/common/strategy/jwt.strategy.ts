import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUsersRepository } from '../../modules/user/database/implements/IUsersRepository';
import { UserViewModel, IUserViewHTTP } from "../../modules/user/viewsModels/ListUserView";
import { UserNotFound } from '../../errors/UserNotFound';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: IUsersRepository
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY || 'test',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload): Promise<IUserViewHTTP> {
    const { id } = payload
    const user = await this.usersRepository.findById(id)
    if(!user) {
      throw new UserNotFound()
    }

    return UserViewModel.toHTTP(user)
  }
}