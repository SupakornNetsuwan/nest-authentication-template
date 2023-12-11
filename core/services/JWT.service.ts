import { Global, Injectable, Scope } from '@nestjs/common';
import { JWTBodyDto } from '../data-access/users';

/**
 * @description This service is a special service (Service works for services). It does not designed to expost for controller,
 * Instead it was for used in services to check a user's right to gain access
 */

@Injectable({ scope: Scope.REQUEST })
export class JWTService {

    private token: string | null = null;
    private data: JWTBodyDto | null = null;

    constructor() { }

    public set setToken(token: string) {
        this.token = token
    }

    public set setData(data: JWTBodyDto) {
        this.data = data;
    }

    public get getToken() {
        return this.token
    }

    public get getData() {
        return this.data
    }
}
