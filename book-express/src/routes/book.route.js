import express from "express";
import { 
    addBook, 
    approveBook, 
    deleteBook, 
    getAllBooks, 
    getBookById, 
    getBooksByAuthor, 
    getPendingBooks, 
    getReviews, 
    updateBook 
} from "../controller/book.controller.js";
import { authenticate, authorize } from '../utils/jwt.js';

const router = express.Router();

router
    .route('/books')
    .get(getAllBooks)
    .post(authenticate, addBook);

router
    .route('/books/author/:authorName')
    .get(getBooksByAuthor);

router
    .route('/books/admin/pending')
    .get(authenticate, authorize("admin", "librarian"), getPendingBooks);

router
    .route('/books/:id/approve')
    .patch(authenticate, authorize("admin", "librarian"), approveBook);

router
    .route('/books/:id')
    .get(getBookById)
    .put(authenticate, authorize("admin", "librarian"), updateBook)
    .delete(authenticate, authorize("admin", "librarian"), deleteBook);

router.get("/books/:id/reviews", getReviews);

export default router;