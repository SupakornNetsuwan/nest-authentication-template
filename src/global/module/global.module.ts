import { JWTService } from '@/core/services/JWT.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    controllers: [],
    providers: [JWTService],
    imports: [],
    exports: [JWTService],
})
export class GlobalModule { }
