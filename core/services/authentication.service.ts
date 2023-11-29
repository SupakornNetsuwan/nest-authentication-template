import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
    private userId: string | null;

    setUserId(userId: string | null) {
        this.userId = userId
    }

    getUserId() {
        return this.userId
    }

}
