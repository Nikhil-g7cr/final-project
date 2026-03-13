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
        try {
            const response = await api.get(`${uri}/current-user`);
            return response.data;
        } catch (error) {
            // If token invalid or not present, return null
            return null;
        }
    }

    async login(email:string, password:string){
        await delay(2000);
        const response = await api.post(`${uri}/login`, { email, password },);
        const { user, token } = response.data;
        
        // Store token
        localStorage.setItem('token', token);
        
        return user;
    }

    async logout(){
        localStorage.removeItem('token');
    }

    async register(user: any) {
        await delay(2000);
        
        const response = await api.post(uri, user);
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