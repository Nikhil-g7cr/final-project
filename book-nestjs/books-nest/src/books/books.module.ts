import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { BooksController } from './books.controller';
// import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './books.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      {name : Book.name,schema:BookSchema}
    ])
  ],
  controllers: [BooksController],
  providers: [BookService],
})
export class BookModule {}
