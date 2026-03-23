export class BookService {
  constructor(bookRepository) {
    this.repository = bookRepository;
  }

  // --- PUBLIC METHODS ---

  async getApprovedBooks() {
    return await this.repository.getAll({ isApproved: true });
  }

  async getBookById(id) {
    return await this.repository.getById(id);
  }

  async getReviews(bookId) {
    const book = await this.repository.getById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    return book.reviews;
  }

  // --- ADMIN / APPROVAL METHODS ---

  async getPendingBooks() {
    return await this.repository.getAll({ isApproved: false });
  }

  async approveBook(id) {
    // Simply update the boolean flag
    return await this.repository.update(id, { isApproved: true });
  }

  // --- CRUD METHODS ---

  async getAllBooks() {
    return await this.repository.getAll();
  }

  async addBook(book, user) {
    // Check if the user is an admin or librarian. If they are, auto-approve the book.
    if (user && user.roles && (user.roles.includes("admin") || user.roles.includes("librarian"))) {
      book.isApproved = true;
    } else {
      // Regular users get the book added as pending
      book.isApproved = false; 
    }
    
    return await this.repository.add(book);
  }

  async deleteBookById(id) {
    return await this.repository.remove(id);
  }

  async updateBook(id, book) {
    return await this.repository.update(id, book);
  }
}