import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { AuthenticationMiddleware } from 'core/middlewares/authentication.middleware';
import { AuthenticationService } from 'core/services/authentication.service';

@Module({
    providers: [UsersService, AuthenticationService], // Services
    controllers: [UsersController], // Main controller (HTTP controller)
    imports: [],
    exports: [], // Exports users's service module to use at other modules
})
export class UsersModule implements NestModule {

    async configure(consumer: MiddlewareConsumer) {

        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes({ path: "api/users", method: RequestMethod.ALL })
    }
}
