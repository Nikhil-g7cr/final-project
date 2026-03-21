import { useBookProvider } from "../../providers/BookProvider";
import BookList from "./BookList";
import BookListScreen from "./BookListScreen";

const BookManagement = () => {
  return (
    <div>
      <h1>Welcome to book management</h1>
      <div className="Management-container">
        <div>
          <BookListScreen />
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
