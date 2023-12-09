import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationMiddleware } from '@/core/middlewares/authentication.middleware';
import { AuthenticationService } from '@/core/services/authentication.service';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthService } from './auth/services/auth.service';
import * as cookieParser from 'cookie-parser';

@Module({
  controllers: [UsersController, AuthController],
  providers: [AuthenticationService, UsersService, AuthService],
  imports: [ConfigModule.forRoot()], // Import all others modules into the main module
  exports: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes("*")
  }
}
