import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [],
    exports: [],
})
export class UsersModule { }
