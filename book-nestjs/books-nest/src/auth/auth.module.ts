
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
        UsersModule,
        JwtModule.register({
            secret:'SECRET_KEY',
            signOptions:{expiresIn:'1d'}
        })
    ],
    providers:[AuthService],
    controllers:[AuthController, AuthController]
})
export class AuthModule {}
