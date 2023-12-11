import { BadRequestException, Body, UsePipes, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, Res, UseGuards, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { AuthorizationGuard } from 'core/guards/authorization.guard';
import { AuthenticationGuard } from 'core/guards/authentication.guard';
import { Roles } from '@/core/decorators/roles.decorator';
import { JWTService } from '@/core/services/JWT.service';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService, private jwtService: JWTService) { }

    @Get()
    @UseGuards(AuthenticationGuard)
    public async getUsers(@Req() req: Request, @Res() res: Response) {

        const allUsers = await this.usersService.findAllUsers()

        return res.send({ message: "All users successfully retrieved", data: allUsers.map(user => user.getUser) })
    }


    @Get("test")
    @Roles(["USER", "ADMIN"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async test(@Req() req: Request, @Res() res: Response) {

        res.send({ data: this.jwtService.getData, token: this.jwtService.getToken })
    }

    @Get(":id")
    @Roles(["USER", "ADMIN"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async getUser(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {

        const userEntity = await this.usersService.findUser(id)

        return res.send({ message: "User found", data: userEntity.getUser })

    }


}
