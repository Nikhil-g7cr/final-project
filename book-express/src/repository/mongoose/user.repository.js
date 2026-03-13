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

}