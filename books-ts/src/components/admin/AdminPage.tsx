import { useEffect, useState } from "react";
import { getUnapprovedBooks, approveBook } from "../../services/adminService";
import type { Book } from "../../types/Book";


const AdminPage = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBooks = async () => {
        try {
            const data: Book[] = await getUnapprovedBooks();
            setBooks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await approveBook(id);

            setBooks(prev =>
                prev.filter(book => book.id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-page">

            <h1 className="admin-title">Admin Book Approval</h1>

            {loading ? (
                <p className="loading">Loading books...</p>
            ) : books.length === 0 ? (
                <p className="no-books">No pending books</p>
            ) : (
                <div className="book-list">

                    {books.map((book) => (
                        <div className="book-card" key={book.id}>

                            <div className="book-info">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author">
                                    Author: {book.author}
                                </p>
                            </div>

                            <button
                                className="approve-btn"
                                onClick={() => handleApprove(book.id)}
                            >
                                Approve
                            </button>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default AdminPage;