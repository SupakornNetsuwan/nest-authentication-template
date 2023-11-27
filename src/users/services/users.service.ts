import { Injectable } from '@nestjs/common';
import type { UserType } from '../types';
import timer from 'utils/timer';

/**
 * สำหรับทำ Dependency injection ให้กับ Users controller
 */

@Injectable()
export class UsersService {
    private usersDatabase: UserType[] = [{ firstName: "John", lastName: "Doe", id: 1, userName: "John" }]

    public async create(user: Omit<UserType, "id">): Promise<boolean> {
        try {
            await timer(100);
            this.usersDatabase.push({ ...user, id: this.usersDatabase.length + 1});
            return true;
        } catch (error) {
            return false;
        }
    }

    public async findAllUsers(): Promise<UserType[]> {
        await timer(100);
        return this.usersDatabase
    }

    public async findById(id: number | string): Promise<UserType | null> {
        if (typeof id === "string") id = Number(id)
        return this.usersDatabase.find(user => user.id === id)
    }
}
