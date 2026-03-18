import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService:JwtService){}

  // it will return true or false
  async canActivate(

    context: ExecutionContext,

  ): Promise<boolean> {

    // we extract
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException();
    }
    try{
      const payload = await this.jwtService.verifyAsync(token,{
        secret:process.env.JWT_SECRET
      })
      console.log("PAYLOAD:", payload);
      request ['user'] = payload;

    }catch(error){
      throw new UnauthorizedException();


    }

    console.log("TOKEN:", token);
    console.log("\n")



    return true;
  }


  private extractTokenFromHeader(request:Request):string|undefined{
    const [type,token]=request.headers.authorization?.split(' ')?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
