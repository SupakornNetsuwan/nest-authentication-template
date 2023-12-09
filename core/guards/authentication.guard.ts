import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationService } from 'core/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authenticationService: AuthenticationService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()

    const userId = this.authenticationService.getUserId()

    if (!userId) {
      console.log(userId, "<- User ID not found")
      throw new HttpException("You are not authenticated", HttpStatus.UNAUTHORIZED)
    }

    return true;
  }
}
