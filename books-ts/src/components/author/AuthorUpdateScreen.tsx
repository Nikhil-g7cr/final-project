import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authorService from "../../services/AuthorService";
import AuthorForm from "../utils/AuthorForm";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";

const AuthorUpdateScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<Error | any>(null);

  useEffect(() => {
    authorService
      .getAuthorById(id!)
      .then((data) => {
        setAuthor(data);
        setStatus("idle");
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setStatus("loading");

      await authorService.updateAuthorById(id!, author);

      setStatus("done");
      navigate(`/authors/${id}`);
    } catch (err: any) {
      setStatus("error");
      setError(err);
    }
  };

  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorView error={error} />;
  if (!author) return null;

  return (
    <AuthorForm
      heading="Edit Author"
      author={author}
      setAuthor={setAuthor}
      validationErrors={validationErrors}
      setValidationErrors={setValidationErrors}
      onSubmit={handleSubmit}
      isEdit={true}
    />
  );
};

export default AuthorUpdateScreen;