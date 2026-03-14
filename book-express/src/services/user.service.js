import { AuthenticationError } from '../utils/exeption.js'
import bcrypt from 'bcrypt'

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async getAllUsers() {
        return (await this
            .userRepository
            .getAllUsers())
            .map(u => {
                return u
            })
    }

    async register(user) {

        user.password = await bcrypt.hash(user.password, 10)
        user = await this.userRepository.addUser(user)
        user = user.toObject();
        return user;
    }

    async login(email, password) {
        try {
            let user = await this.userRepository.getUserByEmail(email)
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                return { login: "success", user }
            } else {
                throw new AuthenticationError();
            }

        } catch (error) {
            throw new AuthenticationError("Invalid Credentials")
        }

    }

    async getFavorites(email) {
        let user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new AuthenticationError("User not found");
        return user.favoriteBooks || [];
    }

    async toggleFavorite(email, bookId) {
        let user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new AuthenticationError("User not found");
        if (!user.favoriteBooks) user.favoriteBooks = [];
        const index = user.favoriteBooks.indexOf(bookId);
        if (index > -1) {
            user.favoriteBooks.splice(index, 1);
        } else {
            user.favoriteBooks.push(bookId);
        }

        await this.userRepository.updateFavorites(email, user.favoriteBooks);
        
        return user.favoriteBooks;
    }

    async removeUser(email) {
        return await this.userRepository.deleteUser(email); 
    }
}