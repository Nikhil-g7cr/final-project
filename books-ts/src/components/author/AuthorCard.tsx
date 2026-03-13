import { Link } from 'react-router-dom';
import type { Author } from '../../types/Author'; 

export interface AuthorCardProps {
    author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
    return (
        <Link className='bookCard' to={`/authors/${author._id}`}>
            <img 
                src={author.photo} 
                alt={author.name} 
                title={author.name} 
            />
            <h4>{author.name}</h4>
        </Link>
    );
};

export default AuthorCard;