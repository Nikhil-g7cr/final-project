import { LabeledInput } from "../utils/Input";
import {
  maxLength,
  minLength,
  required,
  validate,
  ValidationSummaryError,
} from "../../services/validation";

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
      maxLength(2000, "Biography should not exceed 2000 characters."),
    ],
  },
  tags: {
    validators: [required("Author tags are required")],
  },
};

const AuthorForm = ({
  author,
  setAuthor,
  validationErrors,
  setValidationErrors,
  onSubmit,
  heading,
  isEdit = false,
}: any) => {
  const handleInputChange = (value: string, id: string) => {
    const updatedAuthor = { ...author, [id]: value };
    setAuthor(updatedAuthor);

    try {
      validate(updatedAuthor, authorValidationModel, id);

      setValidationErrors((prev: any) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[id];
        return updatedErrors;
      });
    } catch (error) {
      if (error instanceof ValidationSummaryError) {
        setValidationErrors((prev: any) => ({
          ...prev,
          [id]: error.info.errors[id],
        }));
      }
    }
  };

  return (
    <div className="BookAddScreen">
      <h2>{heading}</h2>

      <form onSubmit={onSubmit} className="form">
        {!isEdit && (
          <div className="row">
            <div className="col col-6">
              <LabeledInput
                id="_id"
                label="Author ID"
                value={author._id || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col">
            <LabeledInput
              id="name"
              label="Name"
              value={author.name || ""}
              onChange={handleInputChange}
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
              errorMessage={validationErrors.image}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="biography">Biography</label>
            <textarea
              className="form-control"
              value={author.biography || ""}
              onChange={(e) => handleInputChange(e.target.value, "biography")}
              placeholder="Biography"
            />
            <small className="text-danger">{validationErrors.biography}</small>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <LabeledInput
              id="tags"
              label="Tags"
              value={author.tags?.join(", ") || ""}
              onChange={(value) => {
                const tags = value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean);

                setAuthor({ ...author, tags });

                try {
                  validate(
                    { ...author, tags: value },
                    authorValidationModel,
                    "tags",
                  );

                  setValidationErrors((prev: any) => {
                    const updatedErrors = { ...prev };
                    delete updatedErrors.tags;
                    return updatedErrors;
                  });
                } catch (error) {
                  if (error instanceof ValidationSummaryError) {
                    setValidationErrors((prev: any) => ({
                      ...prev,
                      tags: error.info.errors.tags,
                    }));
                  }
                }
              }}
              errorMessage={validationErrors.tags}
            />
          </div>
        </div>

        <button className="btn btn-success mt-3">
          {isEdit ? "Update Author" : "Add Author"}
        </button>
      </form>
    </div>
  );
};

export default AuthorForm;
