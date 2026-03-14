import { type Book } from '../types/Book'

import {delay} from './delay'
import api from './api'


let uri="books"

class BookService {
  

    async getAllBooks(){
        await delay(1000)
        let response = await api.get(uri)
        // console.log("Data",response.data)
        return response.data;

    }

    
    async getBookById(_id:string):Promise<Book>{
        await delay(1000)
        let response= await api.get(`${uri}/${_id}`)
        return response.data;
    }
    
    async deleteBookById(_id:string){
        await delay(1000)
        await api.delete(`${uri}/${_id}`)
        return {_id};
    }
    
    async addBookBy(book:Book){
        await delay(1000)
        let response= await api.post(uri, book)
        return response.data;
    }

    // async addReview(bookId: string, review: any) {
    //     await delay(1000);
    //     let bookResponse = await api.get(`${uri}/${bookId}`);
    //     let book = bookResponse.data;
    //     let currentReviews = book.reviews || [];
    //     let updatedReviews = [...currentReviews, review];
    //     let response = await api.patch(`${uri}/${bookId}`, {
    //         reviews: updatedReviews
    //     });
    //     return response.data;
    // }

    async addReview(bookId: string, review: any) {
        let payload = {
            ...review,
            bookId: bookId 
        };
        let response = await api.post('/reviews', payload);
        return response.data;
    }

    async getBookReviews(bookId: string) {
        let response = await api.get(`/reviews?bookId=${bookId}`);
        return response.data;
    }

}

export default new BookService()

