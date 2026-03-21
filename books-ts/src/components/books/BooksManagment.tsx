import type { Book } from "../../types/Book"
import BookDetails from "./BookDetails"
import BookList from "./BookList"
import { useState, useEffect } from "react"
import bookService from '../../services/BookService'
import type { Status } from "../../types/Status"

const BookManagment = () => {
    const [viewMode, setViewMode] = useState<"approved" | "pending">("pending"); // Toggle state
    const [books, selectBooks] = useState<Book[]>([])
    const [selectedBook, selectBook] = useState<Book | null>(null)

    const [bookListError, setBookListError] = useState<Error | null>(null)
    const [bookError, setBookError] = useState<Error | null>(null)
    
    const [listStatus, setListStatus] = useState<Status>("loading")
    const [bookStatus, setBookStatus] = useState<Status>("idle")

    // Refetch books when viewMode changes
    useEffect(() => {
        setListStatus("loading")
        
        // Decide which API to call based on the toggle
        const fetchMethod = viewMode === "pending" 
            ? bookService.getPendingBooks() 
            : bookService.getAllBooks();

        fetchMethod
            .then((books) => {
                selectBooks(books)
                setListStatus("done")
                setBookListError(null)
                selectBook(null) // Reset selection when changing tabs
            })
            .catch(error => {
                setListStatus("error")
                setBookListError(error)
            })
    }, [viewMode])

    const handleBookSelect = async (id: string) => {
        try {
            setBookStatus("loading")
            let book = await bookService.getBookById(id)
            selectBook(book)
            setBookStatus("done")
        } catch (error) {
            setBookStatus("error")
            setBookError(error as Error)
        }
    }

    const handleDelete = async () => {
        if (!selectedBook) return;
        try {
            await bookService.deleteBookById(selectedBook._id)
            selectBooks(books.filter(b => b._id !== selectedBook._id))
            selectBook(null)
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    // New Approve Handler
    const handleApprove = async () => {
        if (!selectedBook) return;
        try {
            await bookService.approveBook(selectedBook._id);
            // Remove the approved book from the pending list UI
            selectBooks(books.filter(b => b._id !== selectedBook._id));
            selectBook(null);
            alert("Book approved successfully!");
        } catch(error) {
            console.error("Failed to approve", error);
        }
    }

    if (listStatus === "loading") return <h3>Loading...</h3>

    return (
        <div className="BookManagment">
            <h1>Book Management</h1>
            
            {/* View Toggle Buttons */}
            <div style={{ marginBottom: '20px' }}>
                <button 
                    className={`btn ${viewMode === 'pending' ? 'btn-primary' : 'btn-secondary'}`} 
                    onClick={() => setViewMode('pending')}
                    style={{ marginRight: '10px' }}
                >
                    View Pending Books
                </button>
                <button 
                    className={`btn ${viewMode === 'approved' ? 'btn-primary' : 'btn-secondary'}`} 
                    onClick={() => setViewMode('approved')}
                >
                    View Approved Books
                </button>
            </div>
            
            <div className="row">
                <div className="col col-3">
                    <BookList books={books} onBookSelect={handleBookSelect}/>
                </div>
                <div className="col col-7">
                    {/* Render the selected book. We add an Approve button right above/below BookDetails */}
                    {selectedBook && viewMode === "pending" && (
                        <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba' }}>
                            <h4>Approval Required</h4>
                            <button className="btn btn-success" onClick={handleApprove}>
                                Approve this Book
                            </button>
                        </div>
                    )}
                    <BookDetails book={selectedBook} status={bookStatus} error={bookError} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default BookManagment