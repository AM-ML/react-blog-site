import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/animations.css";
import { initScrollReveal } from "./common/scrollReveal.js";
import LegalModals from "./components/LegalModals.jsx";

// Initialize the app with improved performance
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LegalModals>
        <Router />
      </LegalModals>
    </BrowserRouter>
  </React.StrictMode>
);

// Use efficient approach to initialize scroll reveal animations
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback to avoid blocking the main thread during initial load
  window.requestIdleCallback(() => {
    initScrollReveal();
  }, { timeout: 2000 }); // 2s timeout as fallback
} else {
  // Fallback for browsers that don't support requestIdleCallback
  window.addEventListener('load', () => {
    setTimeout(initScrollReveal, 100);
  });
}
