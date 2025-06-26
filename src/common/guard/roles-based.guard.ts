import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";



export class RolesBasedGuard implements CanActivate {

    async canActivate(context: ExecutionContext) {
        
        return true;
    }
}