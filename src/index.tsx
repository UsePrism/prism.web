import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "assets/css/app.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID!}>
    <App />
  </GoogleOAuthProvider>,
);
