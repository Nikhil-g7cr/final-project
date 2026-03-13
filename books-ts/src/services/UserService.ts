import api from './api'
import { delay } from './delay';

let uri="users"

export interface User{
    id: string,         
    name:string,
    roles?:[string],
    email:string,
    favorites?: string[] 
}

class UserService { 

    async getcurrUser(){
        let userJson = localStorage.getItem('user');
        if(!userJson) return null; // No user in local storage
        const user = JSON.parse(userJson);
        try {
            // const response = await api.get(`${uri}/current-user`);
            return user;
        } catch (error) {
            // If token invalid or not present, return null
            return null;
        }
    }

    async getAllUsers(){
        let response = await api.get(uri);
        return response.data;
    }

    async login( email: string, password: string ) {
        // await delay(2000);

        try{

            let response = await api.post('/users/login', { email, password })
            //{user:{}, token}
            //let's save for future
            let {user,token} = response.data;
            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("token", token)
            return user;
        }catch(error){
            console.log('login error',error)
            throw error;
        }
        // const response = await api.post(`${uri}/login`, { email, password },);
        // const { user, token } = response.data;
        
        // // Store token
        // localStorage.setItem('token', token);
        // localStorage.setItem('user', JSON.stringify(user));
        
        // return user;
    }

    async logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
    }

    async register(user: any) {
        // await delay(2000);
        
        let response = await api.post(uri, user);
        const newUser = response.data;
        
        return newUser;
    }

    async favoriteBooks(user: User, bookId: string) {
        await delay(500);
        let favorites = user.favorites || [];
        
        const isAlreadySaved = favorites.find(id => id == bookId);

        if (isAlreadySaved) {
            favorites = favorites.filter(id => id != bookId);
        } else {
            favorites = [...favorites, bookId];
        }

        let response = await api.patch(`${uri}/${user.id}`, { favorites });
        return response.data; 
    }
}

export default new UserService();