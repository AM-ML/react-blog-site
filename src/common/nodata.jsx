"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  AlertCircle,
  ArrowLeft,
  Home,
  Database,
  RefreshCw,
} from "lucide-react";
import "../css/common/nodata.css";
import AnimationWrapper from "./no-data-animation.jsx";
import emptyBoxImage from "../assets/empty-box.svg"; // You'll need to add this image to your assets

const NoData = ({
  title = "No Data Found",
  msg = "We couldn't find the data you're looking for.",
  addBtn = true,
  btnMsg = "Go Back",
  onClick = () => {},
  onHomeClick = () => {},
  showHomeBtn = true,
  type = "search", // Options: "search", "empty", "error", "loading"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef(null);
  const particlesRef = useRef(null);

  // Create particles for background effect
  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticles = () => {
      const particlesContainer = particlesRef.current;
      particlesContainer.innerHTML = "";

      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "ndt-particle";

        // Random position, size and animation delay
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = opacity;

        particlesContainer.appendChild(particle);
      }
    };

    createParticles();

    // Recreate particles on window resize
    const handleResize = () => {
      createParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get the appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case "search":
        return <Search className="ndt-icon-main" />;
      case "empty":
        return <Database className="ndt-icon-main" />;
      case "error":
        return <AlertCircle className="ndt-icon-main" />;
      case "loading":
        return <RefreshCw className="ndt-icon-main ndt-icon-spin" />;
      default:
        return <Search className="ndt-icon-main" />;
    }
  };

  return (
    <AnimationWrapper>
      <div
        className={`ndt-container ${isVisible ? "visible" : ""}`}
        ref={containerRef}
      >
        <div className="ndt-particles" ref={particlesRef}></div>

        <div className="ndt-content">
          <div className="ndt-illustration">
            <img
              src={emptyBoxImage || "/placeholder.svg"}
              alt="No data"
              className="ndt-image"
            />
            <div className="ndt-icon-circle">{getIcon()}</div>
          </div>

          <div className="ndt-text-container">
            <h1 className="ndt-title">{title}</h1>
            <p className="ndt-message">{msg}</p>

            {addBtn && (
              <div className="ndt-buttons">
                <button
                  onClick={onClick}
                  className="ndt-button"
                  aria-label={btnMsg}
                >
                  <ArrowLeft className="ndt-button-icon" />
                  <span>{btnMsg}</span>
                </button>

                {showHomeBtn && (
                  <button
                    onClick={onHomeClick}
                    className="ndt-button ndt-button-home"
                    aria-label="Home"
                  >
                    <Home className="ndt-button-icon" />
                    <span>Home</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default NoData;
