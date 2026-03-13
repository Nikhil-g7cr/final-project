import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import { AuthenticationError } from './exeption.js'
import { asyncHandler } from './http.js'

const secret = process.env.JWT_SECRET??"This is super secret"
const issuer = process.env.JWT_ISSUER


export const createToken=async(data,option={expiresIn:'7d'})=>{

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
        tokenString=tokenString.replace('BEARER ','')
        try{
            let user = await jwt.verify(tokenString,secret)
            request.user=user
        }catch(ex){
            request.tokenError=new AuthenticationError("Invalid Token",null,ex)
        }
    }

    next(); //move anyway
}


const validate=(tokenError)=>{
    if(tokenError)
        throw tokenError
}

export const authenticate = asyncHandler(({tokenError,next})=>{
    validate(tokenError)
    next()
})

export const authorize = (...expectedRoles) => asyncHandler(({user,tokenError,next})=>{
    validate(tokenError)

    if(!user.roles.some(role=>expectedRoles.includes(role)))
        throw new AuthenticationError("Un Authorized", expectedRoles)

    next()
})

