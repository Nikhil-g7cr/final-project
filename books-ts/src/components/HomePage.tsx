import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h1 className="display-4"> Welcome to the Library </h1>
        <p className="lead">
          Discover amazing books, explore authors and read reviews.
        </p>
      </div>

      <div className="row justify-content-center">

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <h3 className="card-title"> Books</h3>
              <p className="card-text">
                Browse our collection of books and explore reviews.
              </p>
              <Link to="/books" className="btn btn-primary">
                Go to Library
              </Link>
            </div>
          </div>
        </div>

        {/* Authors Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100 text-center">
            <div className="card-body">
              <h3 className="card-title">Authors</h3>
              <p className="card-text">
                Learn more about the writers behind the books.
              </p>
              <Link to="/authors" className="btn btn-success">
                View Authors
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HomePage;