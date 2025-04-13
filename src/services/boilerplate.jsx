import { useEffect, useRef, useState } from "react";
import "../css/services/boilerplate.css";

const Service = ({
  name,
  img,
  description,
  children,
  className,
  slogan = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const serviceRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check if description section is in viewport
      if (descriptionRef.current) {
        const rect = descriptionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          descriptionRef.current.classList.add("animate-in");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
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
      className={`srv-container ${className} ${isVisible ? "visible" : ""}`}
      ref={serviceRef}
    >
      <div className="srv-main">
        <div className="srv-content-wrapper">
          <div className="srv-img-c">
            <img src={img || "/placeholder.svg"} alt="" className="srv-img" />
          </div>

          <div className="srv-text">
            <h1 className="srv-name">{name}</h1>
            <div className="srv-slogan">{slogan}</div>
            <div className="srv-cta">
              <button className="srv-learn-more" onClick={scrollToInfo}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        <a
          className={`scroll-down-icon ${scrolled ? "hidden" : ""}`}
          href="#info"
          onClick={scrollToInfo}
        >
          <i className="fa fa-chevron-down"></i>
        </a>
      </div>

      <div className="srv-scnd" id="info" ref={descriptionRef}>
        <div className="srv-description">{description}</div>

        <div className="srv-additional-content">{children}</div>
      </div>
    </div>
  );
};

export default Service;
