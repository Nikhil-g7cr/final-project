import express from "express"
import { addBook, deleteBook, getAllBooks, getBookById, getReviews, updateBook } from "../controller/book.controller.js"
import { authenticate, authorize } from '../utils/jwt.js'


const router = express.Router()

router
    .route('/books')
    .get(getAllBooks)
    .post(authenticate,authorize("admin"), addBook)

// router
//     .route('/books')
//     .post(authenticate,authorize("admin"),addBook)
    
router
    .route('/books/:id')
    .get(getBookById)
    .put(authenticate, authorize("admin"), updateBook)
    .delete(authenticate, authorize("admin"), deleteBook)

// router
//.route('/book/request')
//     .get(BookRequests)
//     .put(addBook)

router.get("/books/:id/reviews", getReviews);

export default router