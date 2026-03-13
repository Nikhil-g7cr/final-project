import { useState } from "react";
import type { Book, Reviews } from "../../types/Book";
import Spacer from "./Spacer";
import { useUserProvider } from "../../providers/UserProvider";
import { LabeledInput } from "./Input";
import bookService from "../../services/BookService";
import Loading from "./Loading";
import type { Status } from "../../types/Status";

interface ReviewProps {
  book: Book;
  onReviewAdded?: () => void;
}

const Review = ({ book, onReviewAdded }: ReviewProps) => {
  const { user } = useUserProvider();
  const [reviewStatus, setReviewStatus] = useState<Status>("idle");
  const [reviewError, setReviewError] = useState<Error | null>(null);
  const [review, setReview] = useState<Reviews>({
    title: "",
    body: "",
    rating: 0,
    reviewer: user?.name || "",
    bookId: book.id,
  });

  const handleReviewChange = (value:string, id:string) => {
    setReview((prev) => ({
      ...prev,
      [id]: id === "rating" ? Number(value) : value,
      bookId: book.id,
      reviewer: user?.name || "",
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.id) return;

    try {
      setReviewStatus("loading");
      setReviewError(null);
      await bookService.addReview(book.id, review as Reviews);
      setReviewStatus("done");
      setReview({
        title: "",
        body: "",
        rating: 0,
        reviewer: user?.name || "",
        bookId: book.id,
      });
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err) {
      setReviewStatus("error");
      setReviewError(err as Error);
    }
  };

  return (
    <div className="col">
      <h2>Reviews</h2>
      {user && (
        <div className="addreview">
          <h3>Add Your Review</h3>
          <form onSubmit={handleReviewSubmit}>
            
            <LabeledInput
              id="rating"
              label="Rating"
              type="number"
              value={String(review.rating || "")}
              onChange={handleReviewChange}
              placeholder="Enter rating (0-5)"
              inputClassName="no-spinner"
            />
            <div className="form-group">
              <label htmlFor="body" className="form-label">
                Review
              </label>
              <textarea
                id="body"
                className="form-control"
                value={review.body || ""}
                onChange={(e) => handleReviewChange(e.target.value, "body")}
                placeholder="Write your review"
                rows={4}
              />
            </div>
            <Spacer height="10px" />
            <button
              type="submit"
              className="btn btn-primary review-btn"
              disabled={reviewStatus === "loading"}
            >
              {reviewStatus === "loading" ? "Submitting..." : "Submit Review"}
            </button>
            {reviewStatus === "loading" && <Loading />}
            {reviewStatus === "error" && reviewError && (
              <span className="text-danger">{reviewError.message}</span>
            )}
            {reviewStatus === "done" && (
              <span className="text-success">
                Review submitted successfully!
              </span>
            )}
          </form>
        </div>
      )}

      {book.reviews && book.reviews.length > 0 ? (
        <div>
          {book.reviews.map((review, index) => (
            <div
              key={index}
              className="review-item"
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <h4>{review.title}</h4>
              <p>
                <strong>By:</strong> {review.reviewer}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>{review.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews </p>
      )}

    </div>
  );
};

export default Review;
