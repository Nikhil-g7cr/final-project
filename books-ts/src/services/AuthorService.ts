import { type Author } from '../types/Author';
import { delay } from './delay';
import api from './api';

let uri = "authors";

class AuthorService {
  
    async getAllAuthors(): Promise<Author[]> {
        // await delay(1000);
        let response = await api.get(uri);
        return response.data;
    }

    async getAuthorById(_id: string): Promise<Author> {
        // await delay(1000);
        let response = await api.get(`${uri}/${_id}`);
        return response.data;
    }
    
    async deleteAuthorById(_id: string) {
        // await delay(1000);
        await api.delete(`${uri}/${_id}`);
        return { _id };
    }
    
    async addAuthorBy(author: Author) {
        // await delay(1000);
        let response = await api.post(uri, author);
        return response.data;
    }
    
    async getPendingAuthors(): Promise<Author[]> {
        let response = await api.get(`${uri}/admin/pending`);
        return response.data;
    }

    async approveAuthor(_id: string): Promise<Author> {
        let response = await api.patch(`${uri}/${_id}/approve`, {});
        return response.data;
    }
}

export default new AuthorService();