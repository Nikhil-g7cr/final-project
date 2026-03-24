import {
  max,
  min,
  minLength,
  required,
  validate,
  ValidationSummaryError,
} from "../../services/validation";
import LabeledInput from "./Input";

const bookValidationModel = {
  title: {
    validators: [required("Title is required")],
  },
  author: {
    validators: [required("Author is required")],
  },
  price: {
    validators: [
      required("Price is required"),
      min(1, "Price must be greater than 0"),
    ],
  },
  rating: {
    validators: [
      required("Rating is required"),
      min(0, "Rating cannot be less than 0"),
      max(5, "Rating cannot be more than 5"),
    ],
  },
  cover: {
    validators: [required("Cover image URL is required")],
  },
  description: {
    validators: [
      required("Description is required"),
      minLength(10, "Description must be at least 10 characters long"),
    ],
  },
};

const BookForm = ({
  book,
  setBook,
  validationErrors,
  setValidationErrors,
  onSubmit,
  heading,
  isEdit = false,
}: any) => {
  const handleInputChange = (value: string, id: string) => {
    const newValue = id === "price" || id === "rating" ? Number(value) : value;
    const updatedBook = { ...book, [id]: newValue };
    setBook(updatedBook);

    try {
      validate(updatedBook, bookValidationModel, id);

      setValidationErrors((prev: any) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[id];
        return updatedErrors;
      });
    } catch (error) {
      if (error instanceof ValidationSummaryError) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [id]: error.info.errors[id],
        }));
      }
    }
  };

  return (
    <div className="BookAddScreen">
      <h2>{heading}</h2>
      <form onSubmit={onSubmit} className="form">
        <div className="row">
          {!isEdit && (
            <LabeledInput
              id="id"
              label="Book ID"
              value={book._id || ""}
              onChange={handleInputChange}
              placeholder=""
            />
          )}

          <LabeledInput
            id="title"
            label="Title"
            value={book.title || ""}
            onChange={handleInputChange}
            placeholder="Enter book title"
            errorMessage={validationErrors.title}
            disabled={isEdit}
          />

          <LabeledInput
            id="author"
            label="Author"
            value={book.author || ""}
            onChange={handleInputChange}
            placeholder="Enter author name"
            errorMessage={validationErrors.author}
            disabled={isEdit}
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
          <small className="form-text text-danger">
            {validationErrors.description}
          </small>
        </div>

        <div className="row mt-3">
          <button
            type="submit"
            className="btn-primary form-control submit-btn "
          >
            {isEdit ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
