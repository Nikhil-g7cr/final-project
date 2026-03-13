import type { Book } from '../../types/Book';

interface BookSelectorFunction {
    (id:string): void
}

export interface BookListProps {
    books: Book[],
    onBookSelect?: BookSelectorFunction
}


const BookList = ({ books, onBookSelect }: BookListProps) => {

    const handleBookSelect=(book:Book)=>{
        console.log("Selected Book",book)
        if(onBookSelect)
            onBookSelect(book._id)
            console.log("Selected Book ID",book._id)

    }

    return (
        <div className='BookList '>
            <div className="list-group">
                {
                    books.map((book) => (
                    <button onClick={() => handleBookSelect(book)} key={book._id} 
                        className="list-group-item list-group-item-action " aria-current="true">
                        {book.title}
                    </button>))
                }
            </div>
        </div>
    );
};

export default BookList;