import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Router />
  </BrowserRouter>
  // </React.StrictMode>,
);
