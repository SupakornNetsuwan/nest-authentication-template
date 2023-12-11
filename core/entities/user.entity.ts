import { $Enums, User as PrismaUser } from "@prisma/client";
import { JWTBodyDto, UserDto } from "../data-access/users";


class UserEntity implements PrismaUser {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    role: $Enums.UserRole;
    createdAt: Date;
    updatedAt: Date;
    JWT: string;

    constructor(user: PrismaUser) {
        this.id = user.id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
        this.userName = user.userName
        this.updatedAt = user.updatedAt
        this.createdAt = user.createdAt
        this.role = user.role
    }

    get getUser(): Omit<UserDto, "password" | "salt"> {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            role: this.role,
        }
    }

    get getUserEntireData(): UserDto {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            role: this.role
        }
    }

    get getId() {
        return this.id
    }

    get getFirstName() {
        return this.firstName
    }

    get getLastName() {
        return this.lastName
    }

    get getUserName() {
        return this.userName
    }

    get getPassword() {
        return this.password
    }

    get getRole() {
        return this.role
    }

    get getJWT() {
        return this.JWT
    }

    set setJWT(JWT: string) {
        this.JWT = JWT;
    }


    get getJWTBody(): JWTBodyDto {
        return {
            id: this.getId,
            userName: this.userName,
            role: this.role
        }
    }
}

export default UserEntity