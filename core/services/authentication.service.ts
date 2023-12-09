import { Injectable, Scope } from '@nestjs/common';
import { UserDto } from '../data-access/users';

@Injectable({ scope: Scope.REQUEST })
export class AuthenticationService {
    private userId: UserDto["id"]
    private userRole: UserDto["role"]

    setUserId(userId: typeof this.userId) {
        this.userId = userId
    }

    setUserRole(userRole: typeof this.userRole) {
        this.userRole = userRole
    }

    getUserId() {
        return this.userId
    }

    getUserRole() {
        return this.userRole
    }

}
