import { prisma } from "@/core/utils/prisma"
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
    const prismaUsers = await prisma.user.findMany()
    const userEntities = prismaUsers.map(user => new UserEntity(user))
    return userEntities
}
