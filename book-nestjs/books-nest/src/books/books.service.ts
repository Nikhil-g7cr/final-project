import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './books.schema';
import { Books } from './books';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
  ) {}

  validate(book:Books){
    let errors:Record<string,string>={}
    if(!book.title){
      errors["title"]="Required"
    }
    if(!book.description) errors["description"]="REquired"
    else if(book["description"].length<10) errors["description"]="Should be at least 10 chracters"
    else if(book["description"].length>2000) errors["description"]="Should be at most 2000 chracters"

    return errors;
  }

  async getAllBooks(){
    return this.bookModel.find().exec();
  }

  async getBookById(id: string) {

    const book = this.bookModel.find({_id:id})
    return book;
  }

  async addBook(book: Book) {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async updateBook(
    id: string,
    updateData: Book,
  ){
    return this.bookModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteBook(id: string){
    return this.bookModel.findByIdAndDelete(id);
  }

  async getBooksByAuthor(authorName: string){
    return await this.bookModel.find({ author: authorName });
  }
}