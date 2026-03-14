import { Book } from "./books.model.js";

export class MongooseBookRepository {
  async getAll() {
    return await Book.find();
  }

  async getById(id) {
    // FIX: Explicitly select all fields including reviews
    return await Book.findById(id).lean();
  }

  async add(book) {
    let result = await Book.create(book);
    return result;
  }

  async remove(id) {
    await Book.deleteOne({ _id: id });
  }

  async update(id, book) {
    await Book.updateOne(
      { _id: id },
      {
        $set: {
          ...book,
        },
      },
    );
  }
  async getBookById(id) {
    // FIX: Use .lean() to return plain objects instead of Mongoose documents
    return await Book.findById(id).lean();
  }
}