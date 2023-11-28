import { z } from "zod"

export const createUsersSchema = z.object({
    firstName: z.string({ required_error: "firstName is required" }).min(2).max(255),
    lastName: z.string({ required_error: "lastName is required" }).min(2).max(255),
    userName: z.string({ required_error: "userName is required" }).min(2).max(255),
})
export type CreateUsersSchemaDto = z.infer<typeof createUsersSchema>