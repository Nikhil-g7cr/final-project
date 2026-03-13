import mongoose from "mongoose";
import dotenv from "dotenv"



dotenv.config()


const uri = process.env.MONGODB_URI

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function run() {
    await mongoose.connect(uri, clientOptions);
    console.log("-->Database is connected sucessfully");

} 

