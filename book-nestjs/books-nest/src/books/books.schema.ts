import { Document } from "mongoose";
import { Books, Reviews } from "./books";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type BookDocument = Books & Document;

@Schema()
export class Book{
    @Prop()
    _id:string

    @Prop()
    title:string

    @Prop()
    author:string

    @Prop()
    photo:string

    @Prop()
    price:number

    @Prop()
    rating:number

    @Prop()
    description:string

    @Prop()
    tags:string[]

    @Prop({type:Object})
    reviews?:Record<string,string>

}

export const BookSchema = SchemaFactory.createForClass(Book)