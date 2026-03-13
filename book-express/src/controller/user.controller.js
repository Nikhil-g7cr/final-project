import dotenv from 'dotenv'
// import jwt from 'jsonwebtoken'
dotenv.config()
import injector from '../utils/injector.js'
import {asyncHandler} from '../utils/http.js'
// import { AuthenticationError } from '../utils/exceptions.js'
import { createToken } from '../utils/jwt.js'

const userService = injector.get("userService")

const secret = process.env.JWT_SECRET

export const getAllUsers= asyncHandler(async ({request})=>{
    console.log('getting all users')
    return await userService.getAllUsers()
})

export const login=asyncHandler(async ({body,host})=>{
    let {email,password}=body
    
    let {user} = await userService.login(email,password)

    const data={
        subject: user.email,
        name:user.name,
        roles:user.roles,       
    }

    let token = await createToken(data)
    console.log('token',token);

    return {
        user:{...data, photo:user.photo},
        token
    }
    
})


export const currentUser = asyncHandler(async({user})=>{
    return user;
})


export const register = asyncHandler(async ({body})=>await userService.register(body))

