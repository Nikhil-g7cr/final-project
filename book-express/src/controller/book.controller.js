import injector from "../utils/injector.js";

const bookService = injector.get("bookService")

// export async function getAllBooks(request,response) {
//     let books=await bookService.getAllBooks()
//     response.send(books)
// }
// export async function getAllBooks(request, response, next) {
//     try {
//         let books = await bookService.getAllBooks();
//         response.send(books);
//     } catch (error) {
//         response.status(500).send({ message: error.message });
//     }
// }
// ------------------new changes------------------
// ... keep existing imports ...

// 1. UPDATE THIS to only fetch approved books
export async function getAllBooks(request, response, next) {
    try {
        let books = await bookService.getApprovedBooks(); // Changed method name
        response.send(books);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}

// 2. ADD THIS for the admin screen
export async function getPendingBooks(request, response, next) {
    try {
        let books = await bookService.getPendingBooks();
        response.send(books);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}

// 3. ADD THIS to approve a book
export async function approveBook(request, response, next) {
    const { id } = request.params;
    try {
        const result = await bookService.approveBook(id);
        response.status(200).send({ message: "Book approved", result });
    } catch (error) {
        response.status(400).send({ message: error.message });
    }
}

// ... keep getBookById, addBook, deleteBook, updateBook, getReviews ...
// -------------------new changes end------------------

export async function getBookById(request,response){
    let {id}=request.params

    try {
        const book=await bookService.getBookById(id)
        response.send(book)
    } catch (error) {
        response.status(404).send({message:'No such book exist',id})        
    }
}

export async function addBook(request, response) {
    const { body } = request;
    const user = request.user;
    const host = request.get('host');
    const protocol = request.protocol;
    const originalUrl = request.originalUrl;
    
    if (!user) {
        return response.status(401).json({
            message: "Authentication required - please log in to add books"
        });
    }

    try {
        const result = await bookService.addBook(body, user);
        
        response
            .status(201)
            .set("location", `${protocol}://${host}${originalUrl}/${result._id}`)
            .send({
                message: "Book sent for approval",
                result
            });
    } catch (error) {
        response.status(400).send({ message: error.message });
    }
}

// export async function addBook(request, response) {
//   const { body, user } = request;

//   const result = await bookService.addBook(body, user);

//   response.status(201).send({
//     message: "Book sent for approval",
//     result
//   });
// }

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