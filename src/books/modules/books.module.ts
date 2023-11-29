import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BooksController } from '../controllers/books.controller';
import { BooksService } from '../services/books.service';
import { AuthenticationService } from 'core/services/authentication.service';
import { AuthenticationMiddleware } from 'core/middlewares/authentication.middleware';

@Module({
    controllers: [BooksController],
    providers: [BooksService, AuthenticationService],
})
export class BooksModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes('/api/books');
    }
}