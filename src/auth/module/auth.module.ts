import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';

const jwtSecret = process.env.JWT_SECRET

if (!jwtSecret) throw new Error("JWT secret is missing")

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: "1 day" }, global: true })],
    exports: []
})
export class AuthModule { }
