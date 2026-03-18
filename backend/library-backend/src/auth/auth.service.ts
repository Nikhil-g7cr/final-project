import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDTO } from './dto/registerUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { access } from 'fs';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService,
    ){}

    async registerUSer(registerdto:RegisterDTO){

        console.log("RegisterDTO",registerdto)
        const saltRounds=12;
        const hash = await bcrypt.hash(registerdto.password,saltRounds)
        const user=await this.userService.createUser({...registerdto,password:hash})


        // generate jwt token
        const payload={sub:user.email}
        const token=await this.jwtService.signAsync(payload)
        // console.log("Token:-",token)

        return {access_token:token};
    }

    async login(loginDto:LoginDto){
        const user = await this.userService.getUserByEmail(loginDto.email);

        if(!user){
            throw new UnauthorizedException("User not Found")
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        )

        const payload = {sub :user.email};

        const token = await this.jwtService.signAsync(payload)

        return {
            access_toke: token
        }
    }

    // async validateUser(loginDto:LoginDto): Promise<any> {
    //     const user = await this.userService.findOne(loginDto.email);
    //     if (user && user.password === pass) {
    //     const { password, ...result } = user;
    //     return result;
    //     }
    //     return null;
    // }
}
