import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { UnauthorizedPage } from "./UnauthorizedPage";
import { checkUserRole, UserRole } from "@/lib/roles";
import LoadingAnimation from "../common/LoadingAnimation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    const userRole = checkUserRole(user?.["https://my-app.com/roles"] || []);
    if (userRole !== requiredRole) {
      return <UnauthorizedPage />;
    }
  }

  return <>{children}</>;
};
