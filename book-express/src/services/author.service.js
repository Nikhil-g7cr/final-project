import { ValidationError } from "../utils/exeption.js"
export class AuthorService{

    constructor(authorRepository){
        this.repository=authorRepository
    }

    async getAllAuthors(){
        let authors= await this.repository
                        .getAll()
                        
        return authors.map(author=>({id:author._id, 
                            name:author.name, 
                            photo:author.photo
                        }))
    }

    async getAuthorById(id){
        return await this.repository.getById(id)
    }

    async addAuthor(author){
        //validate author details
        var error=new ValidationError();
        error
            .assert(author.name, "name", "required")
            .assert(author.biography, "biography","required")
            .assert(author.biography?.length>=20, "biography",`Min Length required 20: found ${author.biography?.length}`)
            .assert(author.biography?.length<2000, "biography",`Max Length required 20000: found ${author.biography?.length}`)
            .assert(author.tags?.length<=5, "tags",`Max 5 tags allowed. found: ${author.tags.length}`)
        error.throwIfError()

        author._id=author._id ?? author.name.toLowerCase().split(' ').join("-")


        return await this.repository.add(author)
    }

    async removeAuthor(id){
        return await this.repository.remove(id)
    }

    async updateAuthor(id, author){
        return await this.repository.update(id,author);
    }
}

export default new AuthorService();