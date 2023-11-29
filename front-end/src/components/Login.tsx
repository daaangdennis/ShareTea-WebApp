import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navbar.css";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="navbar-login-button ms-3"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="navbar-login-button ms-3"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};
