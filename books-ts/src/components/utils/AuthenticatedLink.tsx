import {Link} from 'react-router-dom'
import { useUserProvider } from '../../providers/UserProvider';

export type LinkVisibility="authenticated"|"unauthenticated"|"always"

export interface AuthenticatedLinkProps{
    to?:string|any,
    children:React.ReactNode,
    linkVisibility?:LinkVisibility,
    className?:string,
    onClick?:(e: React.MouseEvent) => void
}

const AuthenticatedLink= ({to, children, linkVisibility = "always", className, onClick}:AuthenticatedLinkProps)=>{

    const {user} = useUserProvider();
    if(linkVisibility === "authenticated" && !user){
        return null;
    }

    if(linkVisibility === "unauthenticated" && user){
        return null;
    }

    if (!to) {
        return (
            <span className={className} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
                {children}
            </span>
        );
    }

    return (
    <Link to={to} className={className} onClick={onClick}>
        {children}
    </Link>)
}

export default AuthenticatedLink;