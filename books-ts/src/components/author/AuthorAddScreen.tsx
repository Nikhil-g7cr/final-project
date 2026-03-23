import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Author } from "../../types/Author";
import authorService from "../../services/AuthorService";
import { LabeledInput } from "../utils/Input";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";
import { maxLength, minLength, required, validate, ValidationSummaryError } from "../../services/validation";

const authorValidationModel = {
  name:{
    validators:[required("Author name is required")],
  },
  image:{
    validators:[required("Author image is required")],
  },
  biography: {
    validators:[
      required("Author biography is required"),
      minLength(20,"Biography must be at least 20 characters long."),
      maxLength(2000,"Biography should not exceed 2000 characters.")
    ],
  },
  tags:{
    validators:[required("Author tags are required")],
  },
}

const AuthorAddScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const [validationErrors, setValidationErrors] = useState<any>({});

  const [error, setError] = useState<Error | null>(null);

  const [author, setAuthor] = useState<Partial<Author>>({
    _id: "",
    name: "",
    image: "",
    biography: "", 
    tags: [],
  });

  const handleInputChange = (value: string, id: string) => {
    setAuthor((prev) => ({
      ...prev,
      [id]: value,
    }));

    try{
      validate({...author, [id]: value}, authorValidationModel, id);
      setValidationErrors((prev: any) => {
        const updatedErrors = {...prev};
        delete updatedErrors[id];
        return updatedErrors;
      });
    }catch(error){
      if(error instanceof ValidationSummaryError){
        setValidationErrors((prev: any) => ({
          ...prev,
          [id]: error.info.errors[id]
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      validate({...author, tags: author.tags?.join(",") || ""}, authorValidationModel, "");
    }catch(error){
      if(error instanceof ValidationSummaryError){
        setValidationErrors(error.info.errors);
        return;
      }
    }

    try {
      setStatus("loading");
      
      const payload = { ...author };
      if (!payload._id || payload._id.trim() === "") {
        delete payload._id;
      }

      await authorService.addAuthorBy(payload as Author);
      setStatus("done");
      navigate("/authors");
    } catch (err: any) {
      setStatus("error");
      setError(new Error(err.response?.data?.message || err.message));
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
              id="_id"
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
              errorMessage={validationErrors.name}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <LabeledInput
              id="image"
              label="Photo URL"
              value={author.image || ""}
              onChange={handleInputChange}
              placeholder="Enter photo URL"
              errorMessage={validationErrors.image}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="biography" className="form-label">
              Biography
            </label>
            <textarea
              id="biography" 
              className="form-control"
              value={author.biography || ""} 
              onChange={(e) => handleInputChange(e.target.value, "biography")} 
              placeholder="Enter author biography (min 20 characters)" 
              rows={4}
            />
            <small className="form-text text-danger">{validationErrors.biography}</small>
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <LabeledInput
              id="tags"
              label="Tags (Comma separated)"
              value={author.tags?.join(", ") || ""}
              errorMessage={validationErrors.tags}
              onChange={(value) => {
                setAuthor(prev => ({
                  ...prev, 
                  tags: value.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
                }));

                try {
                  validate({...author, tags: value}, authorValidationModel, "tags");
                  setValidationErrors((prev: any) => {
                    const updatedErrors = {...prev};
                    delete updatedErrors.tags;
                    return updatedErrors;
                  });
                } catch(error) {
                  if(error instanceof ValidationSummaryError){
                    setValidationErrors((prev: any) => ({
                      ...prev,
                      tags: error.info.errors.tags
                    }));
                  }
                }
              }}
              placeholder="e.g. fiction, mystery, bestseller"
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