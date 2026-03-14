import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    bookId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    reviewer:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:String
})

export const Review = mongoose.model("reviews",reviewSchema)