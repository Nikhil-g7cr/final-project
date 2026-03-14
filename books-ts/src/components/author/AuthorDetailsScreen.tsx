import AsyncAction from "../utils/AsyncAction";
import AuthorDetails from "./AuthorDetails";
import { useAuthorProvider } from "../../providers/AuthorProvider";
import { useNavigate, useParams } from "react-router-dom";

const AuthorDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { deleteAuthorById, getAuthorById } = useAuthorProvider();

  const handleDelete = async (authorId: string) => {
    try {
      await deleteAuthorById(authorId);
      navigate("/authors");
    } catch (err) {
      console.error("Failed to delete the author", err);
    }
  };

  return (
    <AsyncAction action={() => getAuthorById(id)}>
      {(author: any, status: any, error: any) => (
        <div className="BookDetailsScreen">
          <AuthorDetails
            author={author || null}
            status={status || "loading"}
            error={error || null}
            onDelete={handleDelete}
          />
        </div>
      )}
    </AsyncAction>
  );
};

export default AuthorDetailsScreen;
