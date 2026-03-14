import { Link } from 'react-router-dom'
import { useUserProvider } from '../../providers/UserProvider';

export type LinkVisibility = "authenticated" | "unauthenticated" | "always"
// NEW: Added the fallback type from the prototype
export type ForOthers = "hidden" | "disabled" | "redirect"

export interface AuthenticatedLinkProps {
    to?: string | any,
    children: React.ReactNode,
    linkVisibility?: LinkVisibility,
    className?: string,
    onClick?: (e: React.MouseEvent) => void,
    allowedRoles?: string[],
    forOthers?: ForOthers,
    loginLink?: string
}

const AuthenticatedLink = ({ 
    to, 
    children, 
    linkVisibility = "always", 
    className, 
    onClick, 
    allowedRoles,
    forOthers = "hidden", 
    loginLink = '/users/login' 
}: AuthenticatedLinkProps) => {

    const { user } = useUserProvider();
    let isAuthorized = true;

    if (linkVisibility === "authenticated" && !user) {
        isAuthorized = false;
    } else if (linkVisibility === "unauthenticated" && user) {
        isAuthorized = false;
    } else if (allowedRoles && user) {
        const hasRequiredRole = user.roles?.some((role: string) => allowedRoles.includes(role));
        if (!hasRequiredRole) {
            isAuthorized = false;
        }
    }

    if (!isAuthorized) {
        
        if (forOthers === 'redirect' && typeof to === 'string' && !user) {
            const returnUrl = encodeURIComponent(to);
            const loginPath = `${loginLink}?returnUrl=${returnUrl}`;
            return (
                <Link to={loginPath} className={className}>
                    {children}
                </Link>
            );
        }

        if (forOthers === "disabled") {
            return (
                <button className={className} disabled style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                    {children}
                </button>
            );
        }

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
        </Link>
    )
}

export default AuthenticatedLink;