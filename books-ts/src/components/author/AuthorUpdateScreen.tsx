import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Author } from "../../types/Author";
import authorService from "../../services/AuthorService";
import { LabeledInput } from "../utils/Input";
import Loading from "../utils/Loading";
import ErrorView from "../utils/ErrorView";
import { maxLength, minLength, required, validate, ValidationSummaryError } from "../../services/validation";

// Reusing the exact same validation model from AuthorAddScreen
const authorValidationModel = {
  name: {
    validators: [required("Author name is required")],
  },
  image: {
    validators: [required("Author image is required")],
  },
  biography: {
    validators: [
      required("Author biography is required"),
      minLength(20, "Biography must be at least 20 characters long."),
      maxLength(2000, "Biography should not exceed 2000 characters.")
    ],
  },
  tags: {
    validators: [required("Author tags are required")],
  },
};

const AuthorUpdateScreen = () => {
  const { id } = useParams<{ id: string }>(); // 1. Get ID from URL
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("loading");
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [error, setError] = useState<Error | null>(null);

  const [author, setAuthor] = useState<Partial<Author>>({
    _id: "",
    name: "",
    image: "",
    biography: "", 
    tags: [],
  });

  // 2. Fetch existing author data on mount
  useEffect(() => {
    if (id) {
      authorService.getAuthorById(id)
        .then((fetchedAuthor) => {
          setAuthor(fetchedAuthor);
          setStatus("idle");
        })
        .catch((err) => {
          setError(err);
          setStatus("error");
        });
    }
  }, [id]);

  const handleInputChange = (value: string, fieldId: string) => {
    const updatedAuthor = { ...author, [fieldId]: value };
    setAuthor(updatedAuthor);

    // Real-time validation
    try {
      validate(updatedAuthor, authorValidationModel, fieldId);
      setValidationErrors((prev: any) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[fieldId];
        return updatedErrors;
      });
    } catch (err) {
      if (err instanceof ValidationSummaryError) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [fieldId]: err.info.errors[fieldId]
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Full form validation before submission
    try {
      const validationPayload = {
        ...author,
        tags: author.tags?.length ? author.tags.join(",") : ""
      };
      validate(validationPayload, authorValidationModel, "");
    } catch (err) {
      if (err instanceof ValidationSummaryError) {
        setValidationErrors(err.info.errors);
        return; 
      }
    }

    try {
      setStatus("loading");
      const payload = { ...author };
      
      // Send the update to the backend
      await authorService.updateAuthor(id!, payload);
      setStatus("done");
      // Redirect back to the author details page or list
      navigate(`/authors/${id}`); 
    } catch (err: any) {
      setStatus("error");
      setError(new Error(err.response?.data?.message || err.message));
    }
  };

  if (status === "loading") return <Loading message="Loading author details..." />;
  if (status === "error") return <ErrorView error={error!} />;

  return (
    <div className="BookAddScreen container mt-4">
      <h2>Update Author Details</h2>
      <form onSubmit={handleSubmit} className="form">
        
        {/* We keep the ID readonly since you shouldn't change an ID after creation */}
        <div className="row mb-3">
          <div className="col-md-6">
            <LabeledInput
              id="_id"
              label="Author ID"
              value={author._id || ""}
              onChange={() => {}} // Disabled
              placeholder="Author ID"
              inputClassName="bg-light text-muted" // Make it look disabled
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
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

        <div className="row mb-3">
          <div className="col-md-12">
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

        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="biography" className="form-label">
              Biography
            </label>
            <textarea
              id="biography" 
              className={`form-control ${validationErrors.biography ? 'is-invalid' : ''}`}
              value={author.biography || ""} 
              onChange={(e) => handleInputChange(e.target.value, "biography")} 
              placeholder="Enter author biography (min 20 characters)" 
              rows={4}
            />
            {validationErrors.biography && (
                <small className="form-text text-danger">{validationErrors.biography}</small>
            )}
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-12">
            <LabeledInput
              id="tags"
              label="Tags (Comma separated)"
              value={author.tags?.join(", ") || ""}
              errorMessage={validationErrors.tags}
              onChange={(value) => {
                const newTags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
                const updatedAuthor = { ...author, tags: newTags };
                setAuthor(updatedAuthor);

                try {
                  validate({ ...updatedAuthor, tags: value }, authorValidationModel, "tags");
                  setValidationErrors((prev: any) => {
                    const newErrors = { ...prev };
                    delete newErrors.tags;
                    return newErrors;
                  });
                } catch (err) {
                  if (err instanceof ValidationSummaryError) {
                    setValidationErrors((prev: any) => ({ ...prev, tags: err.info.errors.tags }));
                  }
                }
              }}
              placeholder="e.g. fiction, mystery, bestseller"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary form-control fw-bold py-2">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthorUpdateScreen;