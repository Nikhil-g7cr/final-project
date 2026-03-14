import mongoose from "mongoose";

const reviewObjectSchema = new mongoose.Schema({
  title: String,
  reviewer: String,
  review: String,
  rating: Number
}, { _id: false }); // Don't create _id for nested reviews

const bookSchema = new mongoose.Schema({
  _id: { type: String },
  title: { type: String, required: true },
  author: { type: String },
  cover: { type: String },
  price: Number,
  rating: Number,
  description: { type: String, minLength: 10, maxLength: 2000 },
  tags: { type: [String], maxLength: 5 },
  reviews: { type: [reviewObjectSchema], default: [] } // FIX: Changed from [String] to array of review objects
});

bookSchema.pre("save", function () {
  if (!this._id) {
    this._id = this.title.toLowerCase().split(" ").join("-");
  }
});

export const Book = mongoose.model("books", bookSchema);
