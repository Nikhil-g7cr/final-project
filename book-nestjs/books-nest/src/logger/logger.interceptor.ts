import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest()
    console.log(`Request recived ${request.url}`)

    return next.handle().pipe(
      tap((result)=>console.log('tap',result)),
      map((result)=>{
        if(result instanceof Array){
          result=result.filter((a,i)=>i<3)
        }
      }),
      map((result:any)=>{
        if(result instanceof Array){
          result=result.map(obj=>({item:obj,request_on:new Date()}))
        }else{
          result = {item:result,request_on: new Date()}
        }
        return result;
      }),
      tap(result=>console.log('After Map',result))
    );
  }
}
