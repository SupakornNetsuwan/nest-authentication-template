import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JWTService } from '../services/JWT.service';
import { JWTBodyDto } from '../data-access/users';

/**
 * @description A function syle middleware
 * @remark Middleware -> Guard -> Pipe / Intereptor
 */


@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  constructor(private readonly nestJwtService: NestJwtService, private JwtService: JWTService) { }

  use(req: Request, res: Response, next: () => void) {

    try {
      const [type, token] = req.cookies.token.split(" ")

      const jwtData = this.nestJwtService.verify<JWTBodyDto>(token)

      this.JwtService.setData = jwtData;
      this.JwtService.setToken = token;
      
      console.log("Authentication middleware 🕛")

    } catch (error) {
      if (error instanceof Error) {
        console.log("🔴 Can't extract the token the authentication middleware process will be ignored :", error.message)
      }
    }
    next();
  }
}
