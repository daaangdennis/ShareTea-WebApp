import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
// import reportWebVitals from "./reportWebVitals";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <Auth0Provider
        domain="dev-1jps85kh7htbmqki.us.auth0.com"
        clientId="nmCphOD1XLNlTStDO7Ocemw1MoWRbFxw"
        authorizationParams={{
          audience : "https://sharetea315/",
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
