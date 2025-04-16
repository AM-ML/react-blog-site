"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import "../css/services/servicefull.css";

const ServiceFull = ({
  name,
  cover = false,
  img,
  slogan = "",
  description,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const serviceRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const sloganRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check if content section is in viewport
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          contentRef.current.classList.add("animate-in");

          // Staggered animations for content elements
          if (titleRef.current) {
            setTimeout(() => {
              titleRef.current.classList.add("animate-in");
            }, 200);
          }

          if (sloganRef.current) {
            setTimeout(() => {
              sloganRef.current.classList.add("animate-in");
            }, 400);
          }

          if (descriptionRef.current) {
            setTimeout(() => {
              descriptionRef.current.classList.add("animate-in");
            }, 600);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToInfo = (e) => {
    e.preventDefault();
    const infoSection = document.getElementById("info");
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`srf-container ${className} ${isVisible ? "visible" : ""}`}
      ref={serviceRef}
    >
      <div className="srf-main">
        <div
          className="srf-img-c"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="srf-parallax-wrapper">
            <img
              src={img || "/placeholder.svg"}
              alt={name}
              className={`srf-img ${isHovered ? "hovered" : ""}`}
              style={cover ? { objectFit: "cover" } : {}}
            />
          </div>

          <div className={`srf-overlay ${isHovered ? "active" : ""}`}>
            <div className="srf-overlay-content">
              <div className="srf-overlay-title-wrapper">
                <h1 className="srf-overlay-title">{name}</h1>
                <div className="srf-title-underline"></div>
              </div>

              {slogan && (
                <p className="srf-overlay-slogan">
                  <span className="srf-slogan-quote">"</span>
                  {slogan}
                  <span className="srf-slogan-quote">"</span>
                </p>
              )}

              <button className="srf-learn-more" onClick={scrollToInfo}>
                <span>Learn More</span>
                <ArrowRight className="srf-btn-icon" size={16} />
                <span className="srf-btn-bg"></span>
              </button>
            </div>
          </div>

          <div className="srf-img-decorations">
            <div className="srf-decoration srf-decoration-1"></div>
            <div className="srf-decoration srf-decoration-2"></div>
            <div className="srf-decoration srf-decoration-3"></div>
            <div className="srf-decoration srf-decoration-4"></div>
          </div>

          <a
            className={`srf-scroll-down-icon mb-5 ${scrolled ? "hidden" : ""}`}
            role="button"
            href="#info"
            onClick={scrollToInfo}
            aria-label="Scroll to content"
          >
            <ChevronDown size={24} />
          </a>
        </div>
      </div>

      <div className="srf-scnd" id="info" ref={contentRef}>
        <div className="srf-info">
          <h2 className="srf-name" ref={titleRef}>
            {name}
          </h2>
          {slogan && (
            <div className="srf-slogan" ref={sloganRef}>
              {slogan}
            </div>
          )}
        </div>

        <div className="srf-desc-c" ref={descriptionRef}>
          <div className="srf-desc">{description}</div>
        </div>

        <div className="srf-additional-content">{children}</div>
      </div>
    </div>
  );
};

export default ServiceFull;
