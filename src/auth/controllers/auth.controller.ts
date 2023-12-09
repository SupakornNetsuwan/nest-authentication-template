import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ZodValidationPipe } from '@/core/pipes/zod-validation.pipe';
import { RegisterUserDto, registerUserSchema } from '@/core/data-access/users';
import { Roles } from '@/core/decorators/roles.decorator';
import { EntityMethodInjectPipe } from '@/core/pipes/entity-method-inject.pipe';
import UserEntity from '@/core/entities/user.entity';

@Controller('/api')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/register")
    @UsePipes(new ZodValidationPipe(registerUserSchema), EntityMethodInjectPipe)
    public async register(@Req() req: Request, @Res() res: Response, @Body() body: RegisterUserDto) {
        const registerResult = await this.authService.register(body)
        return res.json({ message: "Register succeed", data: registerResult.getUser })

    }

    @Post("/login")
    public login(@Req() req: Request, @Res() res: Response, @Body() body: any) {
        console.log(req.cookies)
        const loginResult = this.authService.login()
        return res.send(loginResult)
    }
}
