import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="HomePage">
      <h1>Welcome to the Library</h1>
      

      <div className="home-links">
        <Link className="home-link" to="/books">
          <p> 
            Go to the Library
            </p>
        </Link>
        <Link className="home-link" to="/authors">
          <p>Go to the Authors</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
