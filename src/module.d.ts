import 'express';
import type { UserRole } from '@prisma/client';

declare module 'express' {
    export interface Response {
        locals: {
            id?: string;
            userName?: string;
            role?: UserRole;
        }
    }
}