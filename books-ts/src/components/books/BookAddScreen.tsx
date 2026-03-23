import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";
import bookService from "../../services/BookService";
import { LabeledInput } from "../utils/Input";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";

const BookAddScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<Error | null>(null);

  const [book, setBook] = useState<Partial<Book>>({
    title: "",
    author: "",
    price: 0,
    rating: 0,
    cover: "",
    description: "",
    _id: "",
  });

  const handleInputChange = (value: string, id: string) => {
    setBook((prev) => ({
      ...prev,
      [id]: id === "price" || id === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus("loading");
      const payload = { ...book };

      if (!payload._id || payload._id.trim() === "") {
        delete payload._id;
      }
      if (payload.description && payload.description.length < 10) {
        throw new Error("Description must be at least 10 characters long");
      }

      await bookService.addBookBy(payload as Book);
      setStatus("done");
      navigate("/books");
    } catch (err: any) {
      setStatus("error");
      console.error("Backend Error:", err.response?.data || err.message);

      setError(new Error(err.response?.data?.message || err.message));
    }
  };

  if (status === "loading") return <Loading message="Adding book..." />;

  if (status === "error") return <ErrorView error={error!} />;

  return (
    <div className="BookAddScreen">
      <div className="">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <LabeledInput
              id="id"
              label="Book ID"
              value={book._id || ""}
              onChange={handleInputChange}
              placeholder=""
            />

            <LabeledInput
              id="title"
              label="Title"
              value={book.title || ""}
              onChange={handleInputChange}
              placeholder="Enter book title"
            />

            <LabeledInput
              id="author"
              label="Author"
              value={book.author || ""}
              onChange={handleInputChange}
              placeholder="Enter author name"
            />

            <LabeledInput
              id="price"
              label="Price (₹)"
              type="number"
              value={String(book.price || "")}
              onChange={handleInputChange}
              placeholder="Enter price"
            />

            <LabeledInput
              id="rating"
              label="Rating"
              type="number"
              value={String(book.rating || "")}
              onChange={handleInputChange}
              placeholder="Enter rating (0-5)"
            />

            <LabeledInput
              id="cover"
              label="Cover URL"
              value={book.cover || ""}
              onChange={handleInputChange}
              placeholder="Enter cover image URL"
            />

            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              value={book.description}
              onChange={(e) => handleInputChange(e.target.value, "description")}
              placeholder="Enter book description"
              rows={4}
            />
          </div>

          <div className="row mt-3">
            <button
              type="submit"
              className="btn-primary form-control submit-btn "
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAddScreen;
