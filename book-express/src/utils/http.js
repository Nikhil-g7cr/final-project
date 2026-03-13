import appErrors from "../app-errors.js"



const successStatus={
    GET: 200,
    POST:201,
    PUT:202,
    PATCH:202,
    DELETE:204
}

export class ResponseContent{
    constructor(body, header={}){
        this.body=body
        this.header=header
        
    }

    send(response){
        
        for(let key in this.header)
            response.set(key, this.header[key])

        response.send(this.body)
    }
}

export const asyncHandler = (handler)=> async (request,response,next)=>{

    try{

        let context = {request, response, next, 
                    path: request.originalUrl, 
                    url: `${request.host}${request.originalUrl}`, 
                    host:request.host, 
                    headers:request.headers,
                    method:request.method, ...request.params, 
                    body:request.body, query:request.query, 
                    user:request.user,
                    tokenError:request.tokenError
                    }


        let result = await handler(context)
        if(result===undefined)
            return;
        const status = successStatus[request.method]
        response.status(status)
        if(result instanceof ResponseContent)
            return result.send(response)
        else {
            //any other normal result
            
            return response.send(result)
        }

    }catch(error){
        //option#1
        //next(error) //this will send the error to my error middleware

        //we can returns reponse from here so that we don't need middleware
        let {status, body}= appErrors.execute(error,request)
        response.status(status).send(body)
    }


}

