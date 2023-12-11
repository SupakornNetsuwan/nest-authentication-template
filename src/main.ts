import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app // Using global middleware
    .use(cookieParser())
  await app.listen(3000);
}

bootstrap();
