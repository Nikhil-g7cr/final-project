import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./books.schema";
import { Model } from "mongoose";



export class AuthorRepository{
    constructor(
        @InjectModel(Book.name)
        private model:Model<Book>
    ){}
}