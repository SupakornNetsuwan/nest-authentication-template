import { prisma } from "@/core/utils/prisma"
import { RegisterUserDto, UserDto } from "../data-access/users"
import { HttpException, HttpStatus, NotAcceptableException, NotFoundException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { Prisma, User } from "@prisma/client"
import UserEntity from "../entities/user.entity"

/**
 * @param options - The ID of user whom searched or Prisma where option statement
 * @description Find a user by ID or Prisma where option. Abstraction of persistent communication layer
 */

type GetUserFunction = <T extends Prisma.UserWhereInput | string>(options: T) => Promise<UserEntity | null>

export const getUser: GetUserFunction = async (options) => {
    let user: User | null = null;

    if (typeof options === "string") {
        // Search by ID
        user = await prisma.user.findUnique({ where: { id: options } })
    } else if (typeof options === "object") {
        // Search by custom options
        user = await prisma.user.findFirst({ where: options })
    }

    return user ? new UserEntity(user) : null
}

/**
 * @description Find all users
 */

export const getAllUsers = async () => {
    return await prisma.user.findMany()
}

/**
 * @description Validate an user's password
 */

type ValidatePasswordFunction = ({ password, userId }: { password: string, userId: string }) => Promise<boolean>

export const validatePassword: ValidatePasswordFunction = async ({ password, userId }) => {
    const prismaUser = await getUser({ id: userId })
    if (!prismaUser) throw new NotFoundException("User not found")
    const validateResult = await bcrypt.compare(password, prismaUser.password)

    return validateResult
}

/**
 * @param registerUserDto - DTO for register user type
 * @description Register a new user
 */

type RegisterFunction = (registerUserDto: RegisterUserDto) => Promise<UserEntity>

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

/**
 * @param loginUserDto - DTO for login user type
 * @description Login existed user
 */

type LoginFunction = ({ username, password }: { username: string, password: string }) => Promise<UserEntity | null>

export const login = async ({ username, password }) => {
    // const loginResult = await prisma.
    return null
}
