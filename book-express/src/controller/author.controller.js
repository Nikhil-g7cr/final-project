import injector from'../utils/injector.js'

const authorService= injector.get("authorService") 

export async function getAllAuthors(request,response){
    let authors=await authorService.getAllAuthors()
    response.send(authors)
}

export async function getAuthorById(request,response){
    let {id}= request.params
    try {
        const author = await authorService.getAuthorById(id)
        response.send(author)
    } catch (error) {
        response.status(404).send({message:'No such author exist',id})
        
    }
}

export async function addAuthor(request,response){
        const {body}=request
        const host = request.get('host')
        const originalUrl = request.originalUrl
        const protocol = request.protocol
        const result = await authorService.addAuthor(body)
        response
                .status(201)
                .set("location",`${protocol}://${host}${originalUrl}/${result._id}`)
                .send(result)
}

export async function deleteAuthor(request,response){
        const {id} = request.params
        await authorService.removeAuthor(id)
        response.status(204).send()
}

export async function updateAuthor(request,response){
        const {id}=request.params
        const {body}=request
        const result = await authorService.updateAuthor(id,body)
        response.status(202).send(result)
}


export async function getPendingAuthors(request, response) {
    let authors = await authorService.repository.getAll({ isApproved: false });
    response.send(authors);
}

export async function approveAuthor(request, response) {
    const { id } = request.params;
    const result = await authorService.updateAuthor(id, { isApproved: true });
    response.status(200).send({ message: "Author approved", result });
}