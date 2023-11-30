import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'core/decorators/roles.decorator';
import { AuthenticationService } from 'core/services/authentication.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector, private authenticationService: AuthenticationService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const userId = this.authenticationService.getUserId()
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getRequest()

    console.log("Authorization Guard 🛡️", roles, userId)

    return true;
  }
}
