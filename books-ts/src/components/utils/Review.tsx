import { useState, useEffect, type SetStateAction } from "react";
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

  const [fetchedReviews, setFetchedReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [reviewStatus, setReviewStatus] = useState<Status>("idle");
  const [reviewError, setReviewError] = useState<Error | null>(null);

  const [review, setReview] = useState<Partial<Reviews>>({
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    if (book._id) {
      setLoadingReviews(true);

      let allReviewsToShow: { userId: any; rating: any; comment: any; }[] = [];

      if (
        book.reviews &&
        Array.isArray(book.reviews) &&
        book.reviews.length > 0
      ) {
        const legacyReviews = book.reviews.map((rev: any) => ({
          userId: rev.reviewer || "Anonymous",
          rating: rev.rating,
          comment:
            rev.review || rev.body || rev.title || "No comment provided.",
        }));
        allReviewsToShow = [...legacyReviews];
      }

      bookService
        .getBookReviews(book._id)
        .then((data) => {
          const newReviews = data.map((rev: any) => ({
            userId: rev.reviewer || "Anonymous",
            rating: rev.rating,
            comment: rev.comment || "No comment provided.",
          }));

          const combined = [...allReviewsToShow, ...newReviews];
          setFetchedReviews(combined);
          setLoadingReviews(false);
        })
        .catch((err) => {
          console.error("Failed to load reviews", err);
          setFetchedReviews(allReviewsToShow);
          setLoadingReviews(false);
        });
    }
  }, [book._id]);

  const handleReviewChange = (value: string, id: string) => {
    setReview((prev) => ({
      ...prev,
      [id]: id === "rating" ? Number(value) : value,
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book._id) return;

    try {
      setReviewStatus("loading");
      setReviewError(null);

      await bookService.addReview(book._id, review as Reviews);

      const updatedReviews = await bookService.getBookReviews(book._id);

      let allReviewsToShow: { userId: any; rating: any; comment: any; }[] = [];
      if (
        book.reviews &&
        Array.isArray(book.reviews) &&
        book.reviews.length > 0
      ) {
        const legacyReviews = book.reviews.map((rev: any) => ({
          userId: rev.reviewer || "Anonymous",
          rating: rev.rating,
          comment:
            rev.review || rev.body || rev.title || "No comment provided.",
        }));
        allReviewsToShow = [...legacyReviews];
      }

      const newReviews = updatedReviews.map((rev: any) => ({
        userId: rev.reviewer || "Anonymous",
        rating: rev.rating,
        comment: rev.comment || "No comment provided.",
      }));

      const combined = [...allReviewsToShow, ...newReviews];
      setFetchedReviews(combined);

      setReviewStatus("done");
      setReview({ comment: "", rating: 0 });

      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setReviewStatus("error");
      setReviewError(err as Error);
    }
  };
  return (
    <div className="col">
      <hr />
      <h2>Reviews</h2>

      {loadingReviews ? (
        <Loading />
      ) : fetchedReviews.length > 0 ? (
        <div>
          {fetchedReviews.map((rev, index) => (
            <div
              key={index}
              className="review-item"
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p style={{ margin: "0 0 5px 0" }}>
                <strong>User:</strong> {rev.userId}
              </p>
              <p style={{ margin: "0 0 5px 0", color: "#f39c12" }}>
                <strong>Rating:</strong> {rev.rating} / 5
              </p>
              <p style={{ margin: "0" }}>{rev.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet</p>
      )}

      {user && (
        <div className="addreview mt-4 p-3 border rounded bg-light">
          <h3>Add Your Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <LabeledInput
              id="rating"
              label="Rating (1-5)"
              type="number"
              value={String(review.rating || "")}
              onChange={handleReviewChange}
              placeholder="Enter rating (1-5)"
            />
            <div className="form-group mt-2">
              <label htmlFor="comment" className="form-label fw-bold">
                Comment
              </label>
              <textarea
                id="comment"
                className="form-control"
                value={review.comment || ""}
                onChange={(e) => handleReviewChange(e.target.value, "comment")}
                placeholder="Write your review here..."
                rows={3}
              />
            </div>
            <Spacer height="15px" />
            <button
              type="submit"
              className="btn btn-primary review-btn"
              disabled={reviewStatus === "loading"}
            >
              {reviewStatus === "loading" ? "Submitting..." : "Submit Review"}
            </button>
            {reviewStatus === "error" && reviewError && (
              <span className="text-danger ms-3">{reviewError.message}</span>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Review;
