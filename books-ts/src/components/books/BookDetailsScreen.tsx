import AsyncAction from '../utils/AsyncAction';
import BookDetails from './BookDetails';
import { useBookProvider } from '../../providers/BookProvider';
import { useParams, useNavigate } from 'react-router-dom'; 

const BookDetailsScreen = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate(); 
    
    const { deleteBookById, getBookById, selectedBook } = useBookProvider();

    const handleDelete = async (bookId: string) => {
        try {
            await deleteBookById(bookId); 
            navigate('/books'); 
        } catch (error) {
            console.error("Failed to delete the book", error);
        }
    };

    return (
        <AsyncAction action={()=>getBookById(id)}>
            {() => (   
                <div className='BookDetailsScreen'>
                    <BookDetails 
                        book={selectedBook} 
                        status="done" 
                        error={null} 
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </AsyncAction>
    );
};

export default BookDetailsScreen;