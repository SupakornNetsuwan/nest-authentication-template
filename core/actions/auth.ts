import { prisma } from "@/core/utils/prisma"
import { Prisma, User } from "@prisma/client"
import { LoginUserDto, RegisterUserDto, UserDto } from "../data-access/users"
import { HttpException, HttpStatus, NotAcceptableException, NotFoundException, ForbiddenException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import UserEntity from "../entities/user.entity"
import { getUser } from "./user"

type RegisterFunction = (registerUserDto: RegisterUserDto) => Promise<UserEntity>

/**
 * @param registerUserDto - DTO for register user type
 * @description Register a new user if any error occur will throw an HTTP error
 */

export const register: RegisterFunction = async ({ firstName, lastName, password, userName }) => {

    const user = await getUser({ userName })

    if (user) throw new NotAcceptableException("The following username has been taken")

    const hashedPassword = await bcrypt.hash(password, 10)
    const registerResult = await prisma.user.create({
        data: {
            firstName,
            lastName,
            userName,
            password: hashedPassword,
            role: "USER"
        }
    })

    return new UserEntity(registerResult)
}



type LoginFunction = ({ userName, password }: LoginUserDto) => Promise<UserEntity>

/**
 * @param loginUserDto - DTO for login user type
 * @description Login existed user if valid return user entity
 */

export const login: LoginFunction = async ({ userName, password }) => {

    const user = await getUser({ userName })

    if (!user) throw new NotFoundException("User with following username was not found")

    const compareResult = await bcrypt.compare(password, user.getPassword)

    if (!compareResult) throw new ForbiddenException("Username as password are not match");

    return user
}