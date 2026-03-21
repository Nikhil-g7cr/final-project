import { Navigate, Outlet } from "react-router-dom";
import { useUserProvider } from "../../providers/UserProvider";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useUserProvider();

  if (!user) {
    return <Navigate to="/user/login" replace />; 
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = user.roles?.some((role: string) => 
      allowedRoles.includes(role)
    );

    if (!hasRequiredRole) {
      alert("Access Denied: You do not have permission to view this page.");
      return <Navigate to="/" replace />; 
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;