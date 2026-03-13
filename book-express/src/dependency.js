import { AuthorService } from './services/author.service.js'
import {MongooseAuthorRepository} from './repository/mongoose/author.repository.js'
import injector from './utils/injector.js'
import { BookService } from './services/book.service.js'
import { MongooseBookRepository } from './repository/mongoose/books.repository.js'
import {ReviewService} from "./services/review.service.js"
import {UserService} from "./services/user.service.js"
import {MongooseReviewRepository} from "./repository/mongoose/review.repository.js"
import {MongooseUserRepository} from "./repository/mongoose/user.repository.js"


injector.add("authorService", AuthorService)
injector.add("authorRepository", MongooseAuthorRepository)



injector.add("bookService",BookService)
injector.add("bookRepository",MongooseBookRepository)

injector.add("reviewRepository",MongooseReviewRepository)
injector.add("reviewService",ReviewService)


injector.add("userRepository",MongooseUserRepository)
injector.add("userService",UserService)