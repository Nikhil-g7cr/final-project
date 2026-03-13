import api from './api'
// import { delay } from './delay'; // Removed if unused

let uri="users"

export interface User {
    _id?: string, // FIX: Changed to _id to match MongoDB
    name: string,
    roles?: [string],
    email: string,
    favoriteBooks?: string[] // FIX: Changed to match your backend Mongoose model
}

class UserService { 

    async getcurrUser(){
        let userJson = localStorage.getItem('user');
        if(!userJson) return null; 
        const user = JSON.parse(userJson);
        try {
            return user;
        } catch (error) {
            return null;
        }
    }

    async getAllUsers(){
        let response = await api.get(uri);
        return response.data;
    }

    async login( email: string, password: string ) {
        try{
            let response = await api.post('/users/login', { email, password })
            let {user,token} = response.data;
            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("token", token)
            return user;
        }catch(error){
            console.log('login error',error)
            throw error;
        }
    }

    async logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
    }

    async register(user: any) {
        let response = await api.post(uri, user);
        return response.data;
    }

    // FIX: Completely refactored to use the new smart backend endpoint
    async favoriteBooks(user: User, bookId: string) {
        
        // 1. Let the backend do the heavy lifting (it toggles it automatically!)
        let response = await api.post(`${uri}/favorites/${bookId}`);
        
        // 2. The backend returns the fresh, updated array of favorite book IDs
        let updatedFavorites = response.data; 

        // 3. Keep localStorage perfectly in sync so a page refresh doesn't break the UI
        let userJson = localStorage.getItem('user');
        if (userJson) {
            let localUser = JSON.parse(userJson);
            localUser.favoriteBooks = updatedFavorites; 
            localStorage.setItem('user', JSON.stringify(localUser));
        }

        return updatedFavorites; 
    }
}

// Don't forget to export the instance!
export default new UserService();