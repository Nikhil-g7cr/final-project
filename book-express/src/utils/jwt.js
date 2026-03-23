import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import { AuthenticationError } from './exeption.js'
import { asyncHandler } from './http.js'

const secret = process.env.JWT_SECRET??"This is super secret"
const issuer = process.env.JWT_ISSUER


export const createToken=async(data,option={expiresIn:'1d'})=>{

    return await jwt.sign({
        ...data,
        issuer
    },secret,option)
}




export const parseJwtToken=async(request,response,next)=>{
    let tokenString=request.headers.authorization
    if(!tokenString){
        request.tokenError=new AuthenticationError("Token Not Found")
    } else{
        tokenString=tokenString.replace('Bearer ','')
        try{
            let user = await jwt.verify(tokenString,secret)
            request.user=user
        }catch(ex){
            request.tokenError=new AuthenticationError("Invalid Token",null,ex)
        }
    }

    next(); 
}


export const authenticate = (request, response, next) => {
    if (request.tokenError) {
        return response.status(401).json({
            status: 401,
            message: request.tokenError.info.message,
            details: request.tokenError.message
        });
    }
    
    if (!request.user) {
        return response.status(401).json({
            status: 401,
            message: "Authentication required - please log in"
        });
    }
    
    next();
};

export const authorize = (...expectedRoles) => {
    return (request, response, next) => {
        // First check if authenticated
        if (request.tokenError) {
            return response.status(401).json({
                status: 401,
                message: request.tokenError.info.message,
                details: request.tokenError.message
            });
        }
        
        if (!request.user) {
            return response.status(401).json({
                status: 401,
                message: "Authentication required - please log in"
            });
        }

        // Then check authorization
        if (!request.user.roles.some(role => expectedRoles.includes(role))) {
            return response.status(403).json({
                status: 403,
                message: "Access Denied - You do not have permission",
                requiredRoles: expectedRoles,
                userRoles: request.user.roles
            });
        }

        next();
    };
};

