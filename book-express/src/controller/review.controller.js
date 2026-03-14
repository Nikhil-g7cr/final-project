import { Review } from "../repository/mongoose/review.model.js"
import { asyncHandler } from "../utils/http.js"
import { AuthenticationError } from "../utils/exeption.js"

export const getAllReviews = asyncHandler(async ({ request }) => {
    const { bookId } = request.query; 
    if (bookId) {
        return await Review.find({ bookId });
    }
    return await Review.find();
});

export const getReviewById = asyncHandler(async ({ request }) => {
    return await Review.findById(request.params.id);
});

export const addReview = asyncHandler(async ({ request, user }) => {
    if (!user) throw new AuthenticationError("You must be logged in to review.");

    const reviewData = {
        ...request.body,
        userId: user.subject,
        reviewer: user.name,  // FIX: Include the reviewer's name from the authenticated user
    };

    const newReview = await Review.create(reviewData);
    return newReview;
});

export const updateReview = asyncHandler(async ({ request }) => {
    return await Review.findByIdAndUpdate(request.params.id, request.body, { new: true });
});

export const deleteReview = asyncHandler(async ({ request }) => {
    await Review.findByIdAndDelete(request.params.id);
    return { message: "Review deleted" };
});