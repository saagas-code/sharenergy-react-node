import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { NotPermissionForThisUser } from './../../errors/NotPermissionForThisUser';


@Injectable()
export class ensureAdminOrSelf implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user
    const params = req.params
    

    if(user.isAdmin) {
      return true
    }
  
    if(user._id == params.id) {
      return true;
    }

    
    throw new NotPermissionForThisUser()
  }
  
}