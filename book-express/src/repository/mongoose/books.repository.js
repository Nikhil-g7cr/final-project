import { Book } from "./books.model.js";

export class MongooseBookRepository {
  async getAll() {
    return await Book.find();
  }

  async getById(id) {
    return await Book.findById(id).lean();
  }

   // ✅ NEW: add to pending
  async addToPending(bookData) {
    return await PendingBook.create(bookData);
  }

  // ✅ NEW: approve → move to books
  async approveBook(pendingBook) {
    return await Book.create({
      title: pendingBook.title,
      author: pendingBook.author,
      description: pendingBook.description,
      createdBy: pendingBook.addedBy
    });
  }
  // below is the previous add book function
  // ---------------------------
  async add(book) {

    let result = await Book.create(book);
    return result;
  }
  // ----------------------------

  async remove(id) {
    await Book.deleteOne({ _id: id });
  }

  async update(id, book) {
    return await Book.updateOne(
      { _id: id },
      { $set: { ...book } }
    );
  }


  // async getBookById(id) {
  //   return await Book.findById(id).lean();
  // }
}
