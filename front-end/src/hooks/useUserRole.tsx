import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

const useUserRole = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [userRole, setUserRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const decoded: { permissions: string[] } = jwtDecode(accessToken);
          setUserRole(decoded.permissions[0]);
        } catch (error) {
          console.error("Error getting permissions", error);
        }
      }
      setIsLoading(false);
    };

    fetchUserRole();
  }, [getAccessTokenSilently, isAuthenticated]);

  return { userRole, isLoading, setIsLoading };
};

export default useUserRole;
