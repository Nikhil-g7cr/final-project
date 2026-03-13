import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:async function(value){
                const exists = await User.exists({email:value})
                return !exists
            },
            message:value=>`Duplicate Email Id ${value}`
        }
    },
    name:{type:String, required:true},
    password:{type:String, required:true},
    photo:{type:String,default:"https://randomuser.me/api/portraits/lego/0.jpg"},
    roles:{type:[String], default:[]}
})


export const User=mongoose.model("User", userSchema)

export default User