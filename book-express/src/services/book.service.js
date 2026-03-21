import PendingBook from "../repository/mongoose/PendingBook.js";

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

  // async addBook(book, user) {
  //   return await this.repository.addToPending({
  //     ...book,
  //     addedBy: user.id
  //   });
  // }

  async approveBook(id) {
    const pending = await PendingBook.findById(id);

    if (!pending) throw new Error("Not found");

    const newBook = await this.repository.approveBook(pending);

    pending.status = "approved";
    await pending.save();

    return newBook;
  }

  async rejectBook(id) {
    const pending = await PendingBook.findById(id);

    if (!pending) throw new Error("Not found");

    pending.status = "rejected";
    await pending.save();
  }

  async deleteBookById(id) {
    return await this.repository.remove(id);
  }

  async updateBook(id, book) {
    return await this.repository.update(id, book);
  }

  async getReviews(bookId) {
    const book = await this.repository.getById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    return book.reviews;
  }
}
