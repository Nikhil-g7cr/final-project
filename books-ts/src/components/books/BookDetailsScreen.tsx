import AsyncAction from "../utils/AsyncAction";
import BookDetails from "./BookDetails";
import { useBookProvider } from "../../providers/BookProvider";
import { useParams, useNavigate } from "react-router-dom";

const BookDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { deleteBookById, getBookById } = useBookProvider();

  const handleDelete = async (bookId: string) => {
    try {
      await deleteBookById(bookId);
      navigate("/books");
    } catch (error) {
      console.error("Failed to delete the book", error);
    }
  };

  return (
    <AsyncAction action={() => getBookById(id)}>
      {(book: any, status: any, error: any) => (
        <div className="BookDetailsScreen">
          <BookDetails
            book={book || null}
            status={status || "loading"}
            error={error || null}
            onDelete={handleDelete}
          />
        </div>
      )}
    </AsyncAction>
  );
};

export default BookDetailsScreen;
