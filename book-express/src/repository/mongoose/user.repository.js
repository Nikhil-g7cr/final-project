import { InvalidIdError } from '../../utils/exeption.js'
import {User} from './user.model.js'

export class MongooseUserRepository{
    
    async getAllUsers(){
        let users = await User.find()
        
        return users.map(user=>user.toObject() )
    }

    async getUserByEmail(email){
        let user = await User.findOne({email})
        if(user)
            return user.toObject()
        else
            throw new InvalidIdError(email, "No Such User")
    }

    async addUser(user){
        return await User.create(user)
    }

    async deleteUser(email){
        return await User.findOneAndDelete({email})
    }

    async updateUser(email, user){
        await User.findOneAndDelete({email})
        return await User.create(user)
    }

    async modifyUser(email, user){
        let dbUser = User.findOne(email);
        if(dbUser){
            dbUser = dbUser.toObject()
            user={
                ...dbUser,
                ...user
            }
        }

        return await this.updateUser(email, user)
    }

    async updateFavorites(email, favoriteBooks){
        // findOneAndUpdate safely updates the array without needing .save()
        let user = await User.findOneAndUpdate(
            { email }, 
            { favoriteBooks }, 
            { new: true }
        );
        return user.toObject();
    }

}