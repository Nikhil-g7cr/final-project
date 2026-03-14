import express from "express"
import { authenticate, authorize } from "../utils/jwt.js" 

import {
    getAllReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview
} from "../controller/review.controller.js"

const router = express.Router()

router.route("/reviews")
    .get(getAllReviews) 
    .post(authenticate, addReview) 

router.route("/reviews/:id")
    .get(getReviewById)
    .put(authenticate, updateReview)
    .patch(authenticate, updateReview)
    .delete(authenticate, authorize("admin", "librarian"), deleteReview)

export default router