import type { Book } from "../../types/Book"
import BookDetails from "./BookDetails"
import BookList from "./BookList"
import { useState, useEffect } from "react"
import bookService from '../../services/BookService'
import type { Status } from "../../types/Status"

const BookManagementScreen=()=>{

    const [books,selectBooks]=useState<Book[]>([])
    const [selectedBook,selectBook] = useState<Book|null>(null)

    const [bookListError,setBookListError] = useState<Error|null>(null)
    const [bookError,setBookError] = useState<Error|null>(null)
    
    const [listStatus,setListStatus]=useState<Status>("loading")
    const [bookStatus,setBookStatus]=useState<Status>("idle")

    useEffect(()=>{
        setListStatus("loading")
        bookService
            .getAllBooks()
            .then((books)=>{
                selectBooks(books)
                setListStatus("done")
                setBookListError(null)
            })
            .catch(error=>{
                setListStatus("error")
                setBookListError(error)
            })
    },[])

    const handleBookSelect=async (id:string)=>{
        try{
            setBookStatus("loading")
            let book = await bookService.getBookById(id)
            selectBook(book)
            setBookStatus("done")
        }catch(error){
            setBookStatus("error")
            setBookError(error as Error)
        }
    }

    const handleDelete=async ()=>{
        if(!selectedBook) return;

        try{
            await bookService.deleteBookById(selectedBook._id)
            selectBooks(books.filter(b=>b._id!==selectedBook._id))
            selectBook(null)
        }catch(error){
            console.log((error as Error).message)
        }
    }

    if(listStatus==="loading")
        return <h3>Loading...</h3>

    return (
        <div className="BookManagementScreen">
            <h1>Book Management</h1>
            
            <div className="row">
                <div className="col col-3">
                    <BookList books={books} onBookSelect={handleBookSelect}/>
                </div>
                <div className="col col-7">
                    <BookDetails book={selectedBook} status={bookStatus} error={bookError} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    )
}

export default BookManagementScreen