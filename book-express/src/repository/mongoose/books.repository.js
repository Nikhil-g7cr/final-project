import { Book } from "./books.model.js";

export class MongooseBookRepository {
  async getAll(query = {}) {
    return await Book.find(query);
  }
  async getAllbooksByAuthor(query = {}) {
    return await Book.find(query);
  }

  async getById(id) {
    return await Book.findById(id).lean();
  }

  async addToPending(bookData) {
    return await PendingBook.create(bookData);
  }

  async approveBook(pendingBook) {
    return await Book.create({
      title: pendingBook.title,
      author: pendingBook.author,
      description: pendingBook.description,
      createdBy: pendingBook.addedBy
    });
  }
 
  async add(book) {

    let result = await Book.create(book);
    return result;
  }

  async remove(id) {
    await Book.deleteOne({ _id: id });
  }

  async update(id, book) {
    return await Book.updateOne(
      { _id: id },
      { $set: { ...book } }
    );
  }
}
