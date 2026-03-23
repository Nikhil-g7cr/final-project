import injector from "../utils/injector.js";

const bookService = injector.get("bookService");

export async function getAllBooks(request, response, next) {
    try {
        let books = await bookService.getApprovedBooks();
        response.send(books);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}

export async function getBookById(request, response) {
    let { id } = request.params;
    try {
        const book = await bookService.getBookById(id);
        if (!book) {
            return response.status(404).send({ message: 'No such book exists', id });
        }
        response.send(book);
    } catch (error) {
        response.status(404).send({ message: error.message, id });
    }
}

export async function getBooksByAuthor(request, response, next) {
    let { authorName } = request.params;
    try {
        let books = await bookService.repository.getAllbooksByAuthor({ 
            author: authorName, 
            isApproved: true 
        });
        response.send(books);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}

export async function getReviews(request, response) {
    try {
        const bookId = request.params.id;
        const reviews = await bookService.getReviews(bookId);
        response.json(reviews);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}


export async function getPendingBooks(request, response, next) {
    try {
        let books = await bookService.getPendingBooks();
        response.send(books);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}

export async function approveBook(request, response, next) {
    const { id } = request.params;
    try {
        const result = await bookService.approveBook(id);
        response.status(200).send({ message: "Book approved", result });
    } catch (error) {
        response.status(400).send({ message: error.message });
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
                message: "Book processed successfully",
                result
            });
    } catch (error) {
        response.status(400).send({ message: error.message });
    }
}

export async function deleteBook(request, response) {
    const { id } = request.params;
    try {
        await bookService.deleteBookById(id);
        response.status(204).send();
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
}

export async function updateBook(request, response) {
    const { id } = request.params;
    const { body } = request;
    try {
        const result = await bookService.updateBook(id, body);
        response.status(202).send(result);
    } catch (error) {
        response.status(400).send({ message: error.message });
    }
}