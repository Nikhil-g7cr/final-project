import {getAllUsers, register, login, currentUser, getFavorites, toggleFavorite } from '../controller/user.controller.js'

import express from 'express'
import { authenticate, authorize } from '../utils/jwt.js'

const router = express.Router()

router.
    route("/users")
    .get( authorize("admin"),getAllUsers)
    .post(register)

router
    .route("/users/login")
    .post(login)

router
    .route("/users/current-user")
    .get(authenticate, currentUser)

router.route("/users/favorites")
    .get(authenticate, getFavorites)

router.route("/users/favorites/:bookId")
    .post(authenticate, toggleFavorite)

export default router;