import express from "express"

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
.post(addReview)

router.route("/reviews/:id")
.get(getReviewById)
.put(updateReview)
.patch(updateReview)
.delete(deleteReview)

export default router