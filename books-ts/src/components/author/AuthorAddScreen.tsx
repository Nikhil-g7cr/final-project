import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Author } from "../../types/Author";
import authorService from "../../services/AuthorService";
import { LabeledInput } from "../utils/Input";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";

const AuthorAddScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<Error | null>(null);

  const [author, setAuthor] = useState<Partial<Author>>({
    _id: "",
    name: "",
    photo: "",
    bio: "",
  });

  const handleInputChange = (value: string, id: string) => {
    setAuthor((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setStatus("loading");
      await authorService.addAuthorBy(author as Author);
      setStatus("done");
      navigate("/authors");
    } catch (err) {
      setStatus("error");
      setError(err as Error);
    }
  };

  if (status === "loading") return <Loading message="Adding author..." />;

  if (status === "error") return <ErrorView error={error!} />;

  return (
    <div className="BookAddScreen">
      <h2>Add New Author</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <div className="col col-6">
            <LabeledInput
              id="id"
              label="Author ID"
              value={author._id || ""}
              onChange={handleInputChange}
              placeholder="Enter unique ID"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <LabeledInput
              id="name"
              label="Name"
              value={author.name || ""}
              onChange={handleInputChange}
              placeholder="Enter author name"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <LabeledInput
              id="photo"
              label="Photo URL"
              value={author.photo || ""}
              onChange={handleInputChange}
              placeholder="Enter photo URL"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="bio" className="form-label">
              Biography
            </label>
            <textarea
              id="bio"
              className="form-control"
              value={author.bio || ""}
              onChange={(e) => handleInputChange(e.target.value, "bio")}
              placeholder="Enter author biography"
              rows={4}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <button type="submit" className="btn btn-success form-control">
              Add Author
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthorAddScreen;
