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
                <Link className='btn btn-primary' to='/users/login'>Go to Login</Link>
            </div>
        );
    }

    return (
        <AsyncAction action={getAllBooks}>
            {(books: Book[]) => {
                
                let favoriteBooks: Book[] = [];

                if (books && user && user.favoriteBooks) {
                    const favoriteIds = user.favoriteBooks.map((id: string) => String(id));
                    favoriteBooks = books.filter(book => favoriteIds.includes(String(book._id)));
                }

                return (
                    <div className='BookListScreen screen'>
                        <h2>My Favorite Books</h2>

                        {favoriteBooks.length === 0 ? (
                            <p>You have not added any favorite books yet!</p>
                        ) : (
                            <div className="row">
                                {favoriteBooks.map((book: Book) => (
                                    <div className="col col-3 mb-4" key={book._id}>
                                        <BookCard book={book} />
                                    </div>
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