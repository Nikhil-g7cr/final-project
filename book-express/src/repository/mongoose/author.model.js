import mongoose from "mongoose"

const AuthorSchema = new mongoose.Schema({

    _id:{type:String},
    name:{type:String, require:true },
    bio:{type:String, minLength:20, maxLength:2000},
    image:String,
    tags:{
        type:[String],
        maxLength:5
    }
})



AuthorSchema.pre('save',function(){
    if(!this._id){
        this._id=this.name.toLowerCase().split(' ').join('-')
    }
})

export const Author = mongoose.model('authors',AuthorSchema) 