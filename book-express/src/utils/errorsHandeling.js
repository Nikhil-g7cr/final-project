import { ChainManager } from "./chainHandler.js";


export class ErrorChain {
    constructor(defaultHandler) {
        if (!defaultHandler) {
            defaultHandler = (error) => ({
                status: 500,
                body: {
                    status: 500,
                    message: "Internal Server Error:"+error.message,
                    details: error.stackTrace
                }
            })
        }

        this.manager = new ChainManager(defaultHandler)
    }

    add(handler) {
        this.manager.add(handler)
        return this;
    }

    addConditionalHandler(condition,  handler){
        return this.add(conditionHandler(condition,handler))
    }

    addInstanceHandler(ClassName, handler){
        return this.add(instanceHandler(ClassName,  handler))
    }

    addMessageHandler(message, handler){
        return this.add(messageHandler(message,handler))
    }

    execute(error, request) {
        return this.manager.execute(error, request)
    }
}


export const conditionHandler=(matcher, bodyBuilder)=>(error,request,next)=>{
    if(matcher(error,request))
        return bodyBuilder(error,request)
        
    else
        return next()
}

export const instanceHandler = (ErrorClass,  bodyBuilder)=> (error, request,next )=>{
    if(error instanceof ErrorClass){
        return bodyBuilder(error,request)
    }else
        return next()    
}

export const messageHandler = (partialMessage,  bodyBuilder) =>(error,request, next)=>{
    if(error.message.toLowerCase().includes(partialMessage.toLowerCase()))
        return bodyBuilder(error,request)
    else
        return next()
}
