import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserIsNotAdmin } from './../../errors/UserIsNotAdmin';


@Injectable()
export class ensureAdmin implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if(req.user.isAdmin) {
      return true;
    }
    throw new UserIsNotAdmin()
  }
  
}