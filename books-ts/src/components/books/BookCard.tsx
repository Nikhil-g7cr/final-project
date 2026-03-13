import type { Book } from "../../types/Book"; // Make sure this path matches your project
import Card from "../utils/Card";

export interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card path={`/books/${book._id}`} imageAlt={book.title}imageSrc={book.cover} imageTitle={book.title} subheading={book.title} />
  );
};

export default BookCard;
