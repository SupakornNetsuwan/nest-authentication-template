import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    public async getUsers(@Req() req: Request, @Res() res: Response) {

        const allUsers = await this.usersService.findAllUsers()
        return res.send({ message: "All users successfully retrieved", data: allUsers })
    }

    @Get(":id")
    public async getUser(@Req() req: Request, @Res() res: Response, @Param() param: Record<string, any>) {
        const { id } = param;

        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException(`User id ${id} not found`)

        return res.send({ message: "User found", data: user })
    }

    @Post()
    public async createUser(@Req() req: Request, @Res() res: Response, @Body() body: any) {
        if (!body.firstName || !body.lastName || !body.userName) throw new BadRequestException("Body does not complete correctly")

        const result = await this.usersService.create({
            firstName: body.firstName || "-",
            lastName: body.lastName || "-",
            userName: body.userName || "-",
        })

        if (result === false) throw new HttpException("Error creating user", HttpStatus.INTERNAL_SERVER_ERROR)
        return res.send({ message: "User created successfully", data: result })
    }
}
