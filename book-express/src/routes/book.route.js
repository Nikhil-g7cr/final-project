import express from "express"
import { addBook, deleteBook, getAllBooks, getBookById, getPendingBooks, getReviews, updateBook } from "../controller/book.controller.js"
import { authenticate, authorize } from '../utils/jwt.js'


const router = express.Router()

router
    .route('/books')
    .get(getAllBooks)
    .post(authenticate, addBook)

router
    .route('/books/admin/pending')
    .get(authenticate, authorize("admin"), getPendingBooks)


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