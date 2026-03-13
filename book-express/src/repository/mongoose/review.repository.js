import {Review} from "./review.model.js"

export class MongooseReviewRepository{

    async getAll(){
        return await Review.find()
    }

    async getById(id){
        return await Review.findById(id)
    }

    async getByBook(bookId){
        return await Review.find({bookId})
    }

    async add(review){
        return await Review.create(review)
    }

    async remove(id){
        return await Review.deleteOne({_id:id})
    }

    async update(id,data){
        return await Review.findByIdAndUpdate(id,data,{new:true})
    }

}