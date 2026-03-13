import AsyncAction from '../utils/AsyncAction';
import BookCard from '../books/BookCard';
import type { Book } from '../../types/Book';
import { useBookProvider } from '../../providers/BookProvider';
import { useUserProvider } from '../../providers/UserProvider';
import { Link } from 'react-router-dom';

const FavoriteBooksScreen = () => {
    const { getAllBooks } = useBookProvider();
    const { user } = useUserProvider();

    if (!user) {
        return (
            <div className='BookListScreen screen'>
                <h2>My Favorite Books</h2>
                <p>Please log in to see your favorite books.</p>
                <Link className='btn btn-primary' to='/user/login'>Go to Login</Link>
            </div>
        );
    }

    return (
        <AsyncAction action={getAllBooks}>
            {(books: Book[]) => {
                
                let favoriteBooks: Book[] = [];

                if (books && user && user.favorites) {
                    const favoriteIds = user.favorites.map(id => String(id));
                    favoriteBooks = books.filter(book => favoriteIds.includes(String(book.id)));
                }

                return (
                    <div className='BookListScreen screen'>
                        <h2>My Favorite Books</h2>

                        {favoriteBooks.length === 0 ? (
                            <p>Please add the book</p>
                        ) : (
                            <div className="booksContainer">
                                {favoriteBooks.map((book: Book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        </AsyncAction>
    );
};

export default FavoriteBooksScreen;