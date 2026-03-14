import { getAllUsers, register, login, currentUser, deleteUser } from '../controller/user.controller.js'
import express from 'express'
import { authenticate, authorize } from '../utils/jwt.js'

const router = express.Router()

router.route("/users")
    .get(authenticate, authorize("admin"), getAllUsers) 
    .post(register)

router.route("/users/login")
    .post(login)

router.route("/users/current-user")
    .get(authenticate, currentUser)

router.route("/users/:email")
    .delete(authenticate, authorize("admin"), deleteUser)

export default router;