import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/module/users.module';
import { AuthModule } from './auth/module/auth.module';
import { GlobalModule } from './global/module/global.module';
import { AuthenticationMiddleware } from '@/core/middlewares/authentication.middleware';

@Module({
  imports: [ConfigModule.forRoot(), GlobalModule, UsersModule, AuthModule],
  providers: [], // Import all others modules into the main module
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes("*")
  }
}
