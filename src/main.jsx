import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/animations.css";
import { initScrollReveal } from "./common/scrollReveal.js";

// Initialize the app
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Router />
  </BrowserRouter>
  // </React.StrictMode>,
);

// Initialize global scroll reveal animations after the app has loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit to ensure all elements are rendered
  setTimeout(() => {
    initScrollReveal();
  }, 100);
});
