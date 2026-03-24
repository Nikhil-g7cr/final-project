import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authorService from "../../services/AuthorService";
import AuthorForm from "../utils/AuthorForm";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";

const AuthorAddScreen = () => {
  const navigate = useNavigate();

  const [author, setAuthor] = useState({
    name: "",
    image: "",
    biography: "",
    tags: [],
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<Error | any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setStatus("loading");

      const payload = { ...author };
      // if (!payload._id) delete payload._id;

      await authorService.addAuthorBy(payload);

      setStatus("done");
      navigate("/authors");
    } catch (err: any) {
      setStatus("error");
      setError(err);
    }
  };

  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorView error={error} />;

  return (
    <AuthorForm
      heading="Add Author"
      author={author}
      setAuthor={setAuthor}
      validationErrors={validationErrors}
      setValidationErrors={setValidationErrors}
      onSubmit={handleSubmit}
      isEdit={false}
    />
  );
};

export default AuthorAddScreen;