import AsyncAction from '../utils/AsyncAction';
// import AuthorCard from './AuthorCard';
import type { Author } from '../../types/Author';
import { useAuthorProvider } from '../../providers/AuthorProvider';
import AuthenticatedLink from '../utils/AuthenticatedLink';
import Card from '../utils/Card';

const AuthorDisplay = () => {
    const { getAllAuthors } = useAuthorProvider();

    return (
        <AsyncAction action={getAllAuthors}> 
            {(authors: Author[]) => (
                <div className='BookListScreen screen'>
                    <h2>Authors</h2>
                    
                    <AuthenticatedLink linkVisibility="authenticated" className='btn btn-sm btn-primary' to='/authors/add'>
                        Add New Author
                    </AuthenticatedLink>

                    <div className="booksContainer">
                        {authors.map((author: Author) => (
                            <Card path={`${author._id}`} imageSrc={author.photo} imageAlt={author.name} imageTitle={author.name} subheading={author.name} key={author._id} />
                            
                        ))}
                    </div>
                </div>
            )} 
        </AsyncAction> 
    );
};

export default AuthorDisplay;