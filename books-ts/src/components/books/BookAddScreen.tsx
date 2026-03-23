import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";
import bookService from "../../services/BookService";
import { LabeledInput } from "../utils/Input";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";

import { validate, required, min, max, minLength, ValidationSummaryError } from "../../services/validation";

const bookValidationModel = {
  title: {
    validators: [required("Title is required")]
  },
  author: {
    validators: [required("Author is required")]
  },
  price: {
    validators: [
      required("Price is required"), 
      min(1, "Price must be greater than 0")
    ]
  },
  rating: {
    validators: [
      required("Rating is required"),
      min(0, "Rating cannot be less than 0"),
      max(5, "Rating cannot be more than 5")
    ]
  },
  cover: {
    validators: [required("Cover image URL is required")]
  },
  description: {
    validators: [
      required("Description is required"),
      minLength(10, "Description must be at least 10 characters long")
    ]
  }
};

const BookAddScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<Error | null>(null);

  const [validationErrors, setValidationErrors] = useState<any>({});

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
    const newValue = id === "price" || id === "rating" ? Number(value) : value;
    const updatedBook = { ...book, [id]: newValue };
    
    setBook(updatedBook);

    try {
      validate(updatedBook, bookValidationModel, id);
      setValidationErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof ValidationSummaryError) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [id]: err.info.errors[id]
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      validate(book, bookValidationModel, ""); 
    } catch (err) {
      if (err instanceof ValidationSummaryError) {
        setValidationErrors(err.info.errors);
        return;
      }
    }

    try {
      setStatus("loading");
      const payload = { ...book };

      if (!payload._id || payload._id.trim() === "") {
        delete payload._id;
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
              errorMessage={validationErrors.title}
            />

            <LabeledInput
              id="author"
              label="Author"
              value={book.author || ""}
              onChange={handleInputChange}
              placeholder="Enter author name"
              errorMessage={validationErrors.author}
            />

            <LabeledInput
              id="price"
              label="Price (₹)"
              type="number"
              value={String(book.price || "")}
              onChange={handleInputChange}
              placeholder="Enter price"
              errorMessage={validationErrors.price}
            />

            <LabeledInput
              id="rating"
              label="Rating"
              type="number"
              value={String(book.rating || "")}
              onChange={handleInputChange}
              placeholder="Enter rating (0-5)"
              errorMessage={validationErrors.rating}
            />

            <LabeledInput
              id="cover"
              label="Cover URL"
              value={book.cover || ""}
              onChange={handleInputChange}
              placeholder="Enter cover image URL"
              errorMessage={validationErrors.cover}
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
            <small className="form-text text-danger">{validationErrors.description}</small>
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