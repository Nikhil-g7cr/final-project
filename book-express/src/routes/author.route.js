import express from 'express'


import { addAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from '../controller/author.controller.js'
import { authenticate, authorize } from '../utils/jwt.js'

const router = express.Router()

router
    .route("/authors")
    .get(getAllAuthors)    
    .post(addAuthor)

router
    .route("/authors/:id")
    .get(getAuthorById)
    .put(authenticate, updateAuthor)   
    .delete(authenticate, authorize("admin","librarian"), deleteAuthor)    

export default router

