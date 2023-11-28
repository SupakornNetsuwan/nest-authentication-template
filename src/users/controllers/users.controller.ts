import { BadRequestException, Body, UsePipes, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { ZodValidationPipe } from "core/pipes/ZodValidation.pipe";
import { CreateUsersSchemaDto } from '../schemas/createUsersSchema';
import { createUsersSchema } from '../schemas/createUsersSchema';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    public async getUsers(@Req() req: Request, @Res() res: Response) {

        const allUsers = await this.usersService.findAllUsers()
        return res.send({ message: "All users successfully retrieved", data: allUsers })
    }

    @Get(":id")
    public async getUser(@Req() req: Request, @Res() res: Response, @Param("id", ParseIntPipe) id: number) {

        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException(`User id ${id} not found`)

        return res.send({ message: "User found", data: user })
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createUsersSchema))
    public async createUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateUsersSchemaDto
    ) {

        const result = await this.usersService.create({
            firstName: body.firstName || "-",
            lastName: body.lastName || "-",
            userName: body.userName || "-",
        })

        if (result === false) throw new HttpException("Error creating user", HttpStatus.INTERNAL_SERVER_ERROR)
        return res.send({ message: "User created successfully", data: result })
    }
}
