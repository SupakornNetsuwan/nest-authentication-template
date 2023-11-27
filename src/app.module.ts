import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/modules/users.module';
import { BooksModule } from './books/modules/books.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
