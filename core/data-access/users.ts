import { z } from "zod";
import { Prisma, User, UserRole } from "@prisma/client";

export type UserDto = User

export type JWTBodyDto = {
    id: string;
    userName: string,
    role: UserRole;
}

export const registerUserSchema = z.object({
    firstName: z.string({ required_error: "FirstName is required" }),
    lastName: z.string({ required_error: "LastName is required" }),
    userName: z.string({ required_error: "UserName is required" }),
    password: z.string({ required_error: "Password is required" }),
})

export type RegisterUserDto = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    userName: z.string({ required_error: "Username is requried" }),
    password: z.string({ required_error: "Password is required" })
})

export type LoginUserDto = z.infer<typeof loginUserSchema>