import injector from "../utils/injector.js";

const bookService = injector.get("bookService")

export async function getAllBooks(request,response) {
    let books=await bookService.getAllBooks()
    response.send(books)
}

export async function getBookById(request,response){
    let {id}=request.params

    try {
        const book=await bookService.getBookById(id)
        response.send(book)
    } catch (error) {
        response.status(404).send({message:'No such book exist',id})        
    }
}

export async function addBook(request,response) {
    const {body,host,originalUrl}=request
    const result = await bookService.addBook(body)
    response
        .status(201)
        .set("location",`${host}${originalUrl}/${result._id}`)
        .send(result)
}

export async function deleteBook(request,response){
    const {id} = request.params
    await bookService.deleteBookById(id)
    response.status(204).send()
}


export async function updateBook(request,response) {
    const {id}=request.params
    const {body}=request
    const result=await bookService.updateBook(id,body)
    response.status(202).send(result)
}

export async function getReviews(req, res) {

  try {

    const bookId = req.params.id;

    const reviews = await bookService.getReviews(bookId);

    res.json(reviews);

  } catch (error) {

    res.status(404).json({
      message: error.message
    });

  }

}