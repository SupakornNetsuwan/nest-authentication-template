import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from 'core/services/authentication.service';
import { Request, Response } from 'express';

/**
 * Middleware -> Guard -> Pipe / Intereptor
 */

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  constructor(private authenticationService: AuthenticationService) { }

  use(req: Request, res: Response, next: () => void) {
    const bearerToken = req.headers.authorization
    const token = bearerToken?.split(" ")[1] || null
    const userId = token // Mock from read JWT then parse and validate

    this.authenticationService.setUserId(userId) // What Authentication middleware does is only set userId --to--> from Authentication service

    next();

  }
}
