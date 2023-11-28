import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { LogMiddleware } from 'core/middlewares/log.middleware';

@Module({
    imports: [],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [], // Exports users's service module to use at other modules
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LogMiddleware)
            .forRoutes({ path: "/api/users/*", method: RequestMethod.ALL })
    }
}
