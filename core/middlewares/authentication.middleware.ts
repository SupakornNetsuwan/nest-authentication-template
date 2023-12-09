import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationService } from 'core/services/authentication.service';
import { Request, Response } from 'express';

/**
 * Middleware -> Guard -> Pipe / Intereptor
 */

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  constructor(private readonly authenticationService: AuthenticationService) { }

  use(req: Request, res: Response, next: () => void) {
    const bearerToken = req.headers.authorization
    const token = bearerToken?.split(" ")[1] || null

    if (token) {
      this.authenticationService.setUserId("862f4bfd-8dc9-42a9-bbeb-ecd3a834f790") // What Authentication middleware does is only set userId --to--> from Authentication service
      this.authenticationService.setUserRole("USER")
    }

    console.log("Authentication Guard 🛡️")

    next();

  }
}
