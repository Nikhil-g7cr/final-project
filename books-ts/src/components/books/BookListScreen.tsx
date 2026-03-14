import AsyncAction from "../utils/AsyncAction";
import BookCard from "./BookCard";
import type { Book } from "../../types/Book";
import { useBookProvider } from "../../providers/BookProvider";
import AuthenticatedLink from "../utils/AuthenticatedLink";
import Card from "../utils/Card";

const BookListScreen = () => {
  const { getAllBooks } = useBookProvider();

  return (
    <AsyncAction action={getAllBooks}>
      {(books: Book[]) => (
        <div className="BookListScreen screen">
          <h2>Books</h2>

          <AuthenticatedLink
            linkVisibility="authenticated"
            className="btn btn-sm btn-primary"
            to="/books/add"
          >
            Add New Book
          </AuthenticatedLink>

          <div className="booksContainer">
            {books.map((book: Book) => (
              <Card
                path={`/books/${book._id}`}
                imageAlt={book.title}
                imageSrc={book.cover}
                imageTitle={book.title}
                subheading={book.title}
              />
            ))}
          </div>
        </div>
      )}
    </AsyncAction>
  );
};

export default BookListScreen;
