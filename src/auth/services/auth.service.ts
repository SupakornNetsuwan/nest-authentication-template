import { Injectable } from '@nestjs/common';
import { getUser, register } from "@/core/actions/user"
import { RegisterUserDto } from '@/core/data-access/users';
import UserEntity from '@/core/entities/user.entity';
// User use-cases

/**
 * @description We made *.service.ts for manage complexity of data transform
 * and validation after communicate with "actions/\*" which is a persistent layer
 */

@Injectable()
export class AuthService {
    constructor() { }

    public login(): string {
        return "Login ✨"
    }

    public async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const registerResult = await register(registerUserDto)
        return registerResult

    }
}
