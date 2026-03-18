import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDTO } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
        private readonly userService:UserService
    ){}

    @Post('register')
    async register(@Body() registerUserdto:RegisterDTO){
        const token =this.authService.registerUSer(registerUserdto)
        return token;
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return await this.authService.login(loginDto)

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() request){
        const userId= request.user.sub;
        const user = await this.userService.getUserByEmail(userId)
        console.log(user)
        return user;
    }
    

}
