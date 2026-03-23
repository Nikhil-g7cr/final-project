import express from 'express'


import { addAuthor, approveAuthor, deleteAuthor, getAllAuthors, getAuthorById, getPendingAuthors, updateAuthor } from '../controller/author.controller.js'
import { authenticate, authorize } from '../utils/jwt.js'

const router = express.Router()

router
    .route("/authors")
    .get(getAllAuthors)    
    .post(addAuthor)

router
    .route("/authors/admin/pending")
    .get(authenticate, authorize("admin", "librarian"), getPendingAuthors)

router
    .route("/authors/:id/approve")
    .patch(authenticate, authorize("admin", "librarian"), approveAuthor)


router
    .route("/authors/:id")
    .get(getAuthorById)
    .put(authenticate, authorize("admin", "librarian"), updateAuthor)   
    .delete(authenticate, authorize("admin", "librarian"), deleteAuthor)    

export default router

