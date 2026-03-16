import { Injectable } from '@nestjs/common';

const validKeys=[
    "abc",
    "123"
]
@Injectable()
export class ApiService {
    async iskeyPresent(key:string){
        return validKeys.includes(key)
    }
}
