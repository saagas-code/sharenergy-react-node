import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { NotPermissionForThisClient } from './../../errors/NotPermissionForThisClient';



@Injectable()
export class ensureAdminOrMyClient implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user
    const params = req.params
    

    if(user.isAdmin) {
      return true
    }
    const isMyClient = user.clients.find(client => client._id == params.id)
    if(isMyClient) {
      return true;
    }
    
    throw new NotPermissionForThisClient()
  }
  
}