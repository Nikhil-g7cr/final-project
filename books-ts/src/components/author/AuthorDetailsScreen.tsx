import AsyncAction from '../utils/AsyncAction';
import AuthorDetails from './AuthorDetails';
import { useAuthorProvider } from '../../providers/AuthorProvider';
import { useNavigate, useParams } from 'react-router-dom';

const AuthorDetailsScreen = () => {
    const { id } = useParams<{ id: string }>(); 

    const navigate=useNavigate();
    
    const { deleteAuthorById, getAuthorById, selectedAuthor } = useAuthorProvider();

    const handleDelete = async (bookId: string) => {
        try {
            await deleteAuthorById(bookId); 
            navigate('/authors'); 
        } catch (error) {
            console.error("Failed to delete the book", error);
        }
    };

    return (
        <AsyncAction action={()=>getAuthorById(id)}>
            {() => (   
                <div className='BookDetailsScreen'>
                    
                    <AuthorDetails 
                        author={selectedAuthor} 
                        status="done" 
                        error={null} 
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </AsyncAction>
    );
};

export default AuthorDetailsScreen;