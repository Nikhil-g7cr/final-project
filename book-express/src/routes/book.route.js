import express from "express"
import { addBook, deleteBook, getAllBooks, getBookById, getReviews, updateBook } from "../controller/book.controller.js"

const router = express.Router()

router
    .route('/books')
    .get(getAllBooks)
    .post(addBook)
router
    .route('/books/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

router.get("/books/:id/reviews", getReviews);

export default router