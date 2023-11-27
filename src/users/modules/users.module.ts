import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService] // Exports users's service module to use at other modules
})
export class UsersModule { }
