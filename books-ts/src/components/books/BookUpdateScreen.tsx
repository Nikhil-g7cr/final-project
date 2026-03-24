import type { Book } from "../../types/Book"
import BookDetails from "./BookDetails"
import BookList from "./BookList"
import { useState, useEffect } from "react"
import bookService from '../../services/BookService'
import type { Status } from "../../types/Status"
import BookForm from "../utils/BookForm"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../utils/Loading"
import ErrorView from "../utils/ErrorView"

const BookUpdateScreen=()=>{

    const {id} = useParams();
    const navigate = useNavigate();

    const [book,selectBooks]=useState<Book|any>(null)
    // const [selectedBook,selectBook] = useState<Book|null>(null)
    const [validationErrors,setValidationErrors] = useState({})

    const [bookListError,setBookListError] = useState<Error|null>(null)
    const [error,setError] = useState<Error|any>(null)
    
    const [listStatus,setListStatus]=useState<Status>("loading")
    // const [bookStatus,setBookStatus]=useState<Status>("idle")

    useEffect(()=>{
        setListStatus("loading")
        bookService
            .getBookById(id!)
            .then((books)=>{
                selectBooks(books)
                setListStatus("done")
                setBookListError(null)
            })
            .catch(error=>{
                setListStatus("error")
                setBookListError(error)
            })
    },[id])

    const handleSubmit = async (e:any)=>{

        e.preventDefault();

        try{
            setListStatus("loading")
            await bookService.updateBookById(id!, book);
            setListStatus("done");
            navigate(`/books/${id}`)
        }catch(error:any){
            setListStatus("error")
            setError(error);
        }

    }

    if (status ==="loading") return <Loading/>
    if (status ==="error") return <ErrorView error={error}/>
    if(!book) return null;


    return (
        
            
        <BookForm 
            heading={`update Book ${book.title}`}
            book={book}
            setBook={selectBooks}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            onSubmit={handleSubmit}
            isEdit={true}
        />
        
    )
}

export default BookUpdateScreen