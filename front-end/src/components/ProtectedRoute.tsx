import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useUserRole from "../hooks/useUserRole";
import { ProtectedRouteProps } from "../types/types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { isLoading: isAuthLoading } = useAuth0();
  const {
    userRole,
    isLoading: isRoleLoading,
    setIsLoading: setIsRoleLoading,
  } = useUserRole();

  const isAuthorized = roles.includes(userRole);
  const isValidationComplete = !isAuthLoading && !isRoleLoading;

  if (!isValidationComplete) {
    return <h1>Loading...</h1>;
  }

  return isAuthorized ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
      {setIsRoleLoading(true)}
    </>
  );
};

export default ProtectedRoute;
