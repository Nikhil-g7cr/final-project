import {Link} from 'react-router-dom'
import { useUserProvider } from '../../providers/UserProvider';

export type LinkVisibility="authenticated"|"unauthenticated"|"always"

export interface AuthenticatedLinkProps{
    to?:string|any,
    children:React.ReactNode,
    linkVisibility?:LinkVisibility,
    className?:string,
    onClick?:()=>void
}

const AuthenticatedLink= ({to, children, linkVisibility = "always", className}:AuthenticatedLinkProps)=>{

    const {user} = useUserProvider();
    if(linkVisibility === "authenticated" && !user){
        return null;
    }

    if(linkVisibility === "unauthenticated" && user){
        return null;
    }

    return (
    <Link to={to} className={className}>
        {children}
    </Link>)
}


export default AuthenticatedLink;