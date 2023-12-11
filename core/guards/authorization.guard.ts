import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { Roles } from 'core/decorators/roles.decorator';
import { JWTService } from '../services/JWT.service';
import { JWTBodyDto } from '../data-access/users';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private jwtService: JWTService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const req = <Request>context.switchToHttp().getRequest()
    const res = <Response>context.switchToHttp().getResponse()

    try {
      const userData = this.jwtService.getData

      console.log("Authorization guard 🛡️")

      if (!userData || !roles.includes(userData.role)) {
        throw new ForbiddenException("You do not have a permission to access")
      }

      return true;

    } catch (error) {
      throw new ForbiddenException("You do not have a permission to access")
    }
  }
}
