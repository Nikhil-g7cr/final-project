import { Body, Controller, Get, NotFoundException, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import * as booksService from './books.service';
import { Books } from './books';
import { ApiKeyGuard } from 'src/api/api.guard';
import { NotFoundError } from 'rxjs';
import { LoggerInterceptor } from 'src/logger/logger.interceptor';

// @UseInterceptors(LoggerInterceptor)
@Controller('/api/books')
@UseGuards(ApiKeyGuard)
export class BooksController {
    constructor(private bookService:booksService.BookService){}

    // adding all the books
    @Get()
    async getAllBook(){
        let books = await this.bookService.getAllBooks()
        return books;
    }
 
    @Get(':id')
    async getBookById(@Param("id") id:string){
        let book= this.bookService.getBookById(id);
        if(book){
            return book
        }
        else{
            throw new NotFoundException({
                message:"Author Not Found",
                reason:"Invalid ID",
                id
            })
        }
    }

    @Post()
    async addBook(@Body() book:any){
        // console.log(book)
        return await this.bookService.addBook(book)
    }

    @Get('author/:name')
    async getBooksByAuthor(@Param('name') name: string) {
        let bookbyauth=await this.bookService.getBooksByAuthor(name)
        console.log(bookbyauth)
        return bookbyauth;
    }
    // @Put()
    // async updateBook(id:string){
    //     return this.bookService.updateBook(id);
    // }
}


