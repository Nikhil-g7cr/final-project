import { useUserProvider } from "../../providers/UserProvider";

type Audience = "any" | "anonymous" | "guest" | "authenticated" | "authorized";

interface AuthContainerProps {
    children: React.ReactNode;
    auth?: Audience;
    roles?: string[];
}

const AuthContainer = ({ children, auth = "any", roles = [] }: AuthContainerProps) => {
    const { user } = useUserProvider();
    
    const hasRoles = roles.length === 0 || user?.roles?.some((r: string) => roles.includes(r));
    
    const activate = 
        (auth === 'any') ||
        ((auth === 'anonymous' || auth === 'guest') && !user) ||
        ((auth === 'authenticated') && !!user) ||
        ((auth === 'authorized' && !!user && hasRoles)); 

    if (activate) {
        return <>{children}</>;
    } else {
        return null;
    }
};

export default AuthContainer;