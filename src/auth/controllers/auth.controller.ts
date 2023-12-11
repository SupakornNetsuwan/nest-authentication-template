import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ZodValidationPipe } from '@/core/pipes/zod-validation.pipe';
import { LoginUserDto, loginUserSchema, RegisterUserDto, registerUserSchema } from '@/core/data-access/users';
import { EntityMethodInjectPipe } from '@/core/pipes/entity-method-inject.pipe';

@Controller('/api')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/register")
    @UsePipes(new ZodValidationPipe(registerUserSchema), EntityMethodInjectPipe)
    public async register(@Req() req: Request, @Res() res: Response, @Body() body: RegisterUserDto) {

        const userEntiy = await this.authService.register(body)
        return res.json({ message: "Register succeed", data: userEntiy.getUser })

    }

    @Post("/login")
    @UsePipes(new ZodValidationPipe(loginUserSchema))
    public async login(@Req() req: Request, @Res() res: Response, @Body() body: LoginUserDto) {

        const userEntiy = await this.authService.login(body)
        res.cookie("token", `Bearer ${userEntiy.getJWT}`, { secure: true, sameSite: true })
        return res.json({ message: "Login succeed", data: userEntiy.getUser })

    }
}
