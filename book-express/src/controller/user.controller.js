import dotenv from 'dotenv'
dotenv.config()
import injector from '../utils/injector.js'
import {asyncHandler} from '../utils/http.js'
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
        favoriteBooks: user.favoriteBooks || []       
    }

    let token = await createToken(data)
    console.log('token',token);

    return {
        user:{...data, photo:user.photo, email:user.email, _id:user._id},
        token
    }
    
})


export const currentUser = asyncHandler(async({user})=>{
    return user;
})

export const getFavorites = asyncHandler(async ({ user }) => {
    const favorites = await userService.getFavorites(user.subject || user.email);
    return favorites;
})

export const toggleFavorite = asyncHandler(async ({ bookId, user }) => {
    const updatedFavorites = await userService.toggleFavorite(user.subject || user.email, bookId);
    return updatedFavorites;
})

export const register = asyncHandler(async ({body})=>await userService.register(body))

export const deleteUser = asyncHandler(async ({ request }) => {
    const { email } = request.params;
    await userService.removeUser(email);
    return { message: "User deleted successfully", email };
});