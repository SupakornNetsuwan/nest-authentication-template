import { BadRequestException, Body, UsePipes, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { ZodValidationPipe } from "core/pipes/ZodValidation.pipe";
import { CreateUsersSchemaDto } from '../schemas/createUsersSchema';
import { createUsersSchema } from '../schemas/createUsersSchema';
import { AuthenticationService } from 'core/services/authentication.service';
import { AuthenticationGuard } from 'core/guards/authentication.guard';
import { AuthorizationGuard } from 'core/guards/authorization.guard';
import { Roles } from 'core/decorators/roles.decorator';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService, private authenticationService: AuthenticationService) { }

    @Get()
    public async getUsers(@Req() req: Request, @Res() res: Response) {
        const allUsers = await this.usersService.findAllUsers()
        const userId = this.authenticationService.getUserId()
        console.log(userId)

        return res.send({ message: "All users successfully retrieved", data: allUsers })

    }

    @Get(":id")
    @Roles(["USER"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async getUser(@Req() req: Request, @Res() res: Response, @Param("id", ParseIntPipe) id: number) {

        console.log(process.env.x)
        const user = await this.usersService.findById(id);
        if (!user) throw new NotFoundException(`User id ${id} not found`)

        return res.send({ message: "User found", data: user })

    }

    @Post()
    @UseGuards(AuthenticationGuard)
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
