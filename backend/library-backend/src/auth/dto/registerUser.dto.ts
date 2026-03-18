import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDTO{
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;

    @MinLength(4)
    @MaxLength(8)
    @Matches(/#/,{message:'Password must contain #'})
    password:string;


    favorites:string[]
}

export class LoginDto{
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
}