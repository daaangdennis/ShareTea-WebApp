import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navbar.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (user === undefined) {
    return null;
  }

  return (
    <div className="navbar-user-container">
      <img className="navbar-user-img" src={user.picture} alt={user.name} />
      <p className="m-0">{user.name} ({user.email})</p>
    </div>
  );
};

export default Profile;