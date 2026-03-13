export class ReviewService{

    constructor(reviewRepository){
        this.repository = reviewRepository
    }

    async getAllReviews(){
        return await this.repository.getAll()
    }

    async getReviewById(id){
        return await this.repository.getById(id)
    }

    async getReviewsByBook(bookId){
        return await this.repository.getByBook(bookId)
    }

    async addReview(review){
        return await this.repository.add(review)
    }

    async deleteReview(id){
        return await this.repository.remove(id)
    }

    async updateReview(id,data){
        return await this.repository.update(id,data)
    }

}