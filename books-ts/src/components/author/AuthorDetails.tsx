// books-ts/src/components/author/AuthorDetails.tsx

import { useEffect, useState } from "react";
import type { Author } from "../../types/Author";
import type { Book } from "../../types/Book"; 
import Spacer from "../utils/Spacer";
import type { Status } from "../../types/Status";
import AuthenticatedLink from "../utils/AuthenticatedLink";
import BookCard from "../books/BookCard"; 
import BookService from "../../services/BookService";
import Loading from "../utils/Loading";

interface IdSelectorFunction<T> {
  (id: T): void;
}

interface AuthorDetailsProps {
  author: Author | null;
  onDelete: IdSelectorFunction<string>;
  status: Status;
  error: Error | null;
}

const AuthorDetails = ({
  author,
  onDelete,
  status,
  error,
}: AuthorDetailsProps) => {
  const [booksByAuthor, setBooksByAuthor] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);

  useEffect(() => {
    if (author && author.name) {
      setBooksLoading(true);
      BookService.getBooksByAuthor(author.name)
        .then((books) => {
          setBooksByAuthor(books);
          setBooksLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch author's books", err);
          setBooksLoading(false);
        });
    }
  }, [author]);

  if (status === "loading") return <h3>loading...</h3>;
  if (status === "idle") return <h3>Please select an author</h3>;
  if (status === "error") return <h3>{error?.message}</h3>;
  if (!author) return null;

  return (
    <div className="BookDetails">
      <div className="row">
        <div className="col md-col-3">
          <img
            src={author.image}
            className="book-cover"
            title={author.name}
            alt={author.name}
          />
          <Spacer height="10px" />
          <AuthenticatedLink
            linkVisibility="authenticated"
            allowedRoles={["admin", "librarian"]}
            className="btn btn-danger form-control"
            onClick={() => onDelete(author._id)}
          >
            Delete
          </AuthenticatedLink>
        </div>

        <div className="col md-col-9 common-info-container">
          <h2 className="common-title">{author.name}</h2>
          <h4 className="common-description-title">Biography</h4>
          <p className="common-description-text">{author.biography}</p>
        </div>


      </div>
      
      <Spacer height="30px" />
      <div className="author-books-section">
        <h3 className="common-description-title">Books by {author.name}</h3>
        {/* <hr/> */}
        {booksLoading ? (
            <p>Loading books... ?? <Loading/></p>
        ) : booksByAuthor.length === 0 ? (
            <p>No book found for {author.name} author</p>
        ) : (
            <div className="row">
                {booksByAuthor.map((book) => (
                    <div className="col col-2 mb-3" key={book._id}>
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetails;