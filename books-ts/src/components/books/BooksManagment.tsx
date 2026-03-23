import { useState, useEffect } from "react";
import BookService from "../../services/BookService";
import type { Book } from "../../types/Book";

const BookManagment = () => {
    const [pendingBooks, setPendingBooks] = useState<Book[]>([]);

    useEffect(() => {
        BookService.getPendingBooks()
            .then(setPendingBooks)
            .catch(err => console.error(err));
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await BookService.approveBook(id);
            
            setPendingBooks((currentBooks) => 
                currentBooks.filter((book) => book._id !== id)
            );
            
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = async (id: string) => {
        const confirmReject = window.confirm("Are you sure you want to reject and delete this book request?");
        if (!confirmReject) return;

        try {
            await BookService.deleteBookById(id);
            
            setPendingBooks((currentBooks) => 
                currentBooks.filter((book) => book._id !== id)
            );
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Pending Books Approval</h2>
            {pendingBooks.length === 0 ? (
                <p>No pending books to approve.</p>
            ) : (
                <div className="list-group">
                    {pendingBooks.map((book) => (
                        <div key={book._id} className="list-group-item d-flex justify-content-between align-items-center mb-3 shadow-sm rounded">
                            <div className="d-flex align-items-center gap-3">
                                {book.cover && (
                                    <img 
                                        src={book.cover} 
                                        alt={book.title} 
                                        style={{ width: "50px", height: "75px", objectFit: "cover", borderRadius: "4px" }} 
                                    />
                                )}
                                <div>
                                    <h5 className="mb-0">{book.title}</h5>
                                    <small className="text-muted">By {book.author}</small>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-success" 
                                    onClick={() => handleApprove(book._id!)}
                                >
                                    Approve
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleReject(book._id!)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookManagment;