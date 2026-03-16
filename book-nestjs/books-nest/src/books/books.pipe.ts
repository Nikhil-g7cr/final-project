import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BooksPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // const assert=(validConditon,key,message)=>{
    //   if(errors[key]){
    //     errors[key].push(message)
    //   }else{
    //     errors[key]=[message]
    //   }
    //   errors.__count++;
    // }
    return value;
  }
}
