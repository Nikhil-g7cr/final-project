import { type Author } from '../types/Author';
import { delay } from './delay';
import api from './api';

let uri = "authors";

class AuthorService {
  
    async getAllAuthors(): Promise<Author[]> {
        await delay(1000);
        let response = await api.get(uri);
        return response.data;
    }

    async getAuthorById(_id: string): Promise<Author> {
        await delay(1000);
        let response = await api.get(`${uri}/${_id}`);
        return response.data;
    }
    
    async deleteAuthorById(_id: string) {
        await delay(1000);
        await api.delete(`${uri}/${_id}`);
        return { _id };
    }
    
    async addAuthorBy(author: Author) {
        await delay(1000);
        let response = await api.post(uri, author);
        return response.data;
    }
}

export default new AuthorService();