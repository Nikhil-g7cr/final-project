import type { Book } from "../../types/Book";
import Spacer from "../utils/Spacer";
import type { Status } from "../../types/Status";
import Review from "../utils/Review";
import { useBookProvider } from "../../providers/BookProvider";
import { useUserProvider } from "../../providers/UserProvider";
import AuthenticatedLink from "../utils/AuthenticatedLink";

interface IdSelectorFunction<T> {
  (id: T): void;
}

interface BookDetailsProps {
  book: Book | null;
  onDelete: IdSelectorFunction<string>;
  status: Status;
  error: Error | null;
}

const BookDetails = ({ book, onDelete, status, error }: BookDetailsProps) => {
  const { getBookById } = useBookProvider();
  const { user, favoriteBooks } = useUserProvider();

  const isFavorite = book ? (user?.favorites?.some((favId: any) => String(favId) === String(book._id)) ?? false) : false;

  if (status === "loading") return <h3>loading...</h3>;
  if (status === "idle") return <h3>Please select a book</h3>;
  if (status === "error") return <h3>{error?.message}</h3>;
  if (!book) return null;

  const handleReviewAdded = async () => {
    try {
      await getBookById(book._id);
    } catch (err) {
      console.error("Failed to refresh book details:", err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) return;
    try {
     await favoriteBooks(user, book._id);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <div className="BookDetails">
      <div className="row">
        <div className="col md-col-3">

          <AuthenticatedLink
            linkVisibility="authenticated"
            className="btn btn-danger form-control"
            onClick={() => onDelete(book._id)}
          >
            Delete
          </AuthenticatedLink>
          <Spacer height="10px" />

          <AuthenticatedLink
            linkVisibility="authenticated"
            
          >
            <button className={`btn form-control ${isFavorite ? 'btn-warning' : 'btn-success'}`}
            onClick={handleToggleFavorite}>
            {isFavorite ? 'Unfavorite' : 'Add to Favorites'}

            </button>
          </AuthenticatedLink>
          <Spacer height="10px" />

          <img src={book.cover} className="book-cover" title={book.title} alt={book.title} />
        </div>
        <div className="col md-col-9">
          <h2>{book.title}</h2>
          <ul>
            <li>Price: ₹ {book.price}</li>
            <li>Rating: {book.rating} / 5</li>
          </ul>
          <h2>Description</h2>
          <p>{book.description}</p>
        </div>
      </div>
      <div className="reviews-section">
        <div className="reviews-content">
          <Review book={book} onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;