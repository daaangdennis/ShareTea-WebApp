import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (user === undefined) {
    return null;
  }

  const profileStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const userDetailsStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const userPictureStyle: React.CSSProperties = {
    marginLeft: "20px",
    height: "auto",
    width: "auto",
    maxHeight: "100px", 
    maxWidth: "100px"
  };
  
  

  return (
    <div style={profileStyle}>
      <div style={userDetailsStyle}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div style={userPictureStyle}>
        <img src={user.picture} alt={user.name} />
      </div>
    </div>
  );
};

export default Profile;