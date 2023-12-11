import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTService } from '../services/JWT.service';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly jwtService: JWTService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = <Request>context.switchToHttp().getRequest()
    const res = <Response>context.switchToHttp().getResponse()

    console.log("Authentication guard 🛡️")

    if (this.jwtService.getToken) {
      return true;
    }

    throw new UnauthorizedException("You are not authenticated")
  }
}
