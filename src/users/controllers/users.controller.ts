import { BadRequestException, Body, UsePipes, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { AuthorizationGuard } from 'core/guards/authorization.guard';
import { AuthenticationGuard } from 'core/guards/authentication.guard';
import { Roles } from '@/core/decorators/roles.decorator';
import { BooksService } from '@/src/books/services/books.service';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    @UseGuards(AuthenticationGuard)
    public async getUsers(@Req() req: Request, @Res() res: Response) {
        const allUsers = await this.usersService.findAllUsers()
        
        return res.send({ message: "All users successfully retrieved", data: allUsers })

    }

    @Get(":id")
    @Roles(["USER"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async getUser(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
        const userEntity = await this.usersService.findById(id)
        return res.send({ message: "User found", data: userEntity })
    }
}
