import type { Author } from "../../types/Author";
import Spacer from "../utils/Spacer";
import type { Status } from "../../types/Status";
import AuthenticatedLink from "../utils/AuthenticatedLink";

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
        <div className="col md-col-9">
          <h2>{author.name}</h2>
          <h4>Biography</h4>
          <p>{author.biography}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
