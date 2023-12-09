import { $Enums, User as PrismaUser } from "@prisma/client";
import { UserDto } from "../data-access/users";
import { validatePassword as validatePasswordAction } from "../actions/user";

class UserEntity implements PrismaUser {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    role: $Enums.UserRole;
    createdAt: Date;
    updatedAt: Date;

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
            role: this.role
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

    public async validatePassword(password: string = this.getPassword): Promise<boolean> {
        return await validatePasswordAction({ password, userId: this.getId })
    }
}

export default UserEntity