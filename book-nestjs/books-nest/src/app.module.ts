import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { AuthorsController } from './authors/authors.controller';
import { ReviewsController } from './reviews/reviews.controller';
import { UsersController } from './users/users.controller';
import { BookService } from './books/books.service';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from "dotenv"
import { BookModule } from './books/books.module';
import { ApiService } from './api/api.service';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { ApiKeyGuard } from './api/api.guard';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
dotenv.config()

const mongodb = process.env.MONGODB_URI
// const MONGODB_URI = mongodb+srv://nikhilkumar_db_user:Nikhil@nikhilmern.pwtvxe7.mongodb.net/BooksStore?appName=NikhilMERN


@Module({
  imports: [
    MongooseModule.forRoot(`${mongodb}`),
    BookModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, AuthorsController, ReviewsController, UsersController],
  providers: [AppService, ApiService,{
    provide:"APP_INTERCEPTOR",useClass:LoggerInterceptor
  },
{provide:"APP_GUARD",useClass:ApiKeyGuard},
AuthService],
})
export class AppModule {}
