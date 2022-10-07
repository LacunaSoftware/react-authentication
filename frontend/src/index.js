import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WebPkiService from "./services/webpki.service";
import AuthenticationService from "./services/authentication.service";
const root = ReactDOM.createRoot(document.getElementById("root"));

const webPkiService = new WebPkiService();
const authenticationService = new AuthenticationService();

root.render(
  <React.StrictMode>
    <App
      webPkiService={webPkiService}
      authenticationService={authenticationService}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
