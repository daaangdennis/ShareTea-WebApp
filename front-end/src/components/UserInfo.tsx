import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navbar.css";
import { getUser } from "../apis/Dashboard";

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<any>(undefined);
  useEffect(() => {
    //API
    getUser(setUser, getAccessTokenSilently);
  }, []);

  if (user === undefined) {
    return null;
  }

  return (
    <div className="navbar-user-container">
      <img className="navbar-user-img" src={user.picture} alt={user.name} />
      <p className="m-0">
        {user.name}
      </p>
    </div>
  );
};

export default Profile;
