import { Author } from "./author.model.js";


export class MongooseAuthorRepository{

    async getAll(){
        return await Author.find()
    }

    async getById(id){
        return await Author.findById(id)
    }

    async add(author){
        let result = await Author.create(author)
        return result;
    }

    async remove(id){
        await Author.deleteOne({_id:id})   
    }
    async update(id,author){
        await Author.updateOne(
            {_id:id},
            {
                $set:{
                    ...author
                }
            }
        )
    }

}