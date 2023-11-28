import { Injectable } from '@nestjs/common';
import type { UserType } from '../types';
import timer from 'core/utils/timer';

/**
 * This part does dependency injection for "Users controller"
 * 
 * Service is a subset of providers that are instantiated by the Nest IoC container and that can be injected into classes using the @Injectable() decorator.
 * 
 * It should contain only business logic. It should never access HTTP request objects (req and res) or any global objects such as process.
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

    public async findById(id: number | string): Promise<UserType | undefined> {
        if (typeof id === "string") id = Number(id)
        return this.usersDatabase.find(user => user.id === id)
    }
}
