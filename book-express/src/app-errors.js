import { ErrorChain } from "./utils/errorsHandeling.js";
import { HttpError, ValidationError, InvalidIdError, AuthenticationError, DuplicateIdError } from './utils/exeption.js'


const appErrors = new ErrorChain();

appErrors
    .addInstanceHandler(HttpError, (error) => ({
        status: error.status,
        body: error.body
    }))
    .addInstanceHandler(ValidationError,(error)=>({
        status:400,
        body:{
            message:"Validation Error",
            errors: error.errors
        }
    }))
    .addInstanceHandler(InvalidIdError, error=>({
        status:404,
        body:error.info
    }))
    .addInstanceHandler(DuplicateIdError, error=>({
        status:400,
        body:error.info
    }))
    .addInstanceHandler(AuthenticationError, error=>{

        let status= 401
        //const message= status===401?"UnAuthenticated": "UnAuthorized"
        console.log('error.info',error.info);
        if(error.info.requiredRoles && error.info.requiredRoles.length>0)
            status=403
        console.log('status',status);
        
        return {
            status,
            body:{                
                ...error.info
            }
        }

    })
    .addMessageHandler("User validation failed", error=>{
        const status=400
        const message= "Validation Failed"

        return {
            status,
            body:{
                message,
                details: error
            }
        }
    })




export default appErrors;