import api from './api'

let uri="users"

export interface User {
    _id?: string, 
    name: string,
    roles?: [string],
    email: string,
    favoriteBooks?: string[] 
    photo?: string
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


    async deleteUser(email: string) {
        let response = await api.delete(`${uri}/${email}`);
        return response.data;
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

    async favoriteBooks(user: User, bookId: string) {
        
        let response = await api.post(`${uri}/favorites/${bookId}`);
        
        let updatedFavorites = response.data; 

        let userJson = localStorage.getItem('user');
        if (userJson) {
            let localUser = JSON.parse(userJson);
            localUser.favoriteBooks = updatedFavorites; 
            localStorage.setItem('user', JSON.stringify(localUser));
        }

        return updatedFavorites; 
    }
}

export default new UserService();