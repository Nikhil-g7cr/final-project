import injector from "../utils/injector.js"

const reviewService = injector.get("reviewService")

export async function getAllReviews(req,res){
    const reviews = await reviewService.getAllReviews()
    res.send(reviews)
}

export async function getReviewById(req,res){
    const {id} = req.params
    const review = await reviewService.getReviewById(id)
    res.send(review)
}

export async function addReview(req,res){
    const review = await reviewService.addReview(req.body)
    res.status(201).send(review)
}

export async function updateReview(req,res){
    const {id} = req.params
    const review = await reviewService.updateReview(id,req.body)
    res.send(review)
}

export async function deleteReview(req,res){
    const {id} = req.params
    await reviewService.deleteReview(id)
    res.status(204).send()
}