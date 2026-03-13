import AsyncAction from '../utils/AsyncAction';
import AuthorDetails from './AuthorDetails';
import { useAuthorProvider } from '../../providers/AuthorProvider';
import { useNavigate, useParams } from 'react-router-dom';

const AuthorDetailsScreen = () => {
    const { id } = useParams<{ id: string }>(); 

    const navigate=useNavigate();
    
    const { deleteAuthorById, getAuthorById, selectedAuthor } = useAuthorProvider();

    // Rename bookId to authorId for clarity
    const handleDelete = async (authorId: string) => {
        try {
            await deleteAuthorById(authorId); 
            navigate('/authors'); 
        } catch (error) {
            console.error("Failed to delete the author", error);
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