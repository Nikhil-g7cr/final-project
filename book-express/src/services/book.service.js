

export class BookService {
  constructor(bookRepository) {
    this.repository = bookRepository;
  }

  async getAllBooks() {
    return await this.repository.getAll();
  }

  async getBookById(id) {
    return await this.repository.getById(id);
  }

  async addBook(book) {
    return await this.repository.add(book);
  }

  async deleteBookById(id) {
    return await this.repository.remove(id);
  }

  async updateBook(id, book) {
    return await this.repository.update(id, book);
  }

  async getReviews(bookId) {
    const book = await this.repository.getBookById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    return book.reviews;
  }
}
