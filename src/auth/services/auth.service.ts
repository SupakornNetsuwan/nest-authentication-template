import { Injectable, UsePipes } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '@/core/data-access/users';
import UserEntity from '@/core/entities/user.entity';
// Actions
import * as userAction from "@/core/actions/user"
import * as authAction from "@/core/actions/auth"
import { JwtService } from '@nestjs/jwt';


/**
 * @description We made *.service.ts for manage complexity of data transform
 * and validation after communicate with "actions/\*" which is a persistent layer
 */

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    public async login(loginUserDto: LoginUserDto) {

        const userEntiy = await authAction.login(loginUserDto)
        const token = await this.jwtService.signAsync(userEntiy.getJWTBody)
        userEntiy.setJWT = token
        
        return userEntiy
    }

    public async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const userEntiy = await authAction.register(registerUserDto)

        return userEntiy
    }
}
