import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/components/navbar-dropdown.css";

const DropdownContent = () => {
  const dpContentRef = useRef(null);

  useEffect(() => {
    const dpContent = dpContentRef.current;

    const handleMouseEnter = () => {
      dpContent.style.display = "grid";

      // Small buffer to handle floating-point inaccuracies
      const buffer = 5;
      const dpContentRect = dpContent.getBoundingClientRect();

      // Check if dpContent overflows the viewport by considering the buffer
      if (dpContentRect.right > window.innerWidth - buffer) {
        dpContent.style.left = "auto";
        dpContent.style.right = "0";
      } else {
        dpContent.style.left = "";
        dpContent.style.right = "";
      }
    };

    const handleMouseLeave = () => {
      dpContent.style.display = "none";
    };

    const dpElement = dpContent.parentElement;

    dpElement.addEventListener("mouseenter", handleMouseEnter);
    dpElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dpElement.removeEventListener("mouseenter", handleMouseEnter);
      dpElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const dpElement = dpContentRef.current.parentElement;
    const handleC = () => {};
    const handleML = () => {
      dpElement.addEventListener("click", handleC);
    };
    const handleME = () => {
      dpElement.removeEventListener("click", handleC);
    };
    dpElement.addEventListener("mouseover", handleML);
    dpElement.addEventListener("mouseleave", handleME);
  }, []);

  return (
    <div className="dp-content" ref={dpContentRef}>
      <div className="dp-content-container">
        <Link to="/services/civil-engineering" className="dp-title d-block">
          Civil Engineering
        </Link>
        <Link to="/services/electrical-engineering" className="dp-title">
          Electrical Engineering
        </Link>
        <Link to="/services/architecture" className="dp-title">
          Architecture
        </Link>
        <Link to="/services/interior-design" className="dp-title">
          Interior Design
        </Link>
        <Link to="/services/solar-systems" className="dp-title">
          Solar Systems
        </Link>
        <Link to="/services/water-systems" className="dp-title">
          Off-Grid Water Systems
        </Link>
        <Link to="/services/water-pumps" className="dp-title">
          Water Pumps
        </Link>
        <Link to="/services/project-management" className="dp-title">
          Project Management
        </Link>
        <Link to="/services/networking" className="dp-title">
          Networking {"&"} IT
        </Link>
        <Link to="/services/feasibility-study" className="dp-title">
          Feasibility Study
        </Link>
        <Link to="/services/innovative-solutions" className="dp-title">
          Innovative Solutions
        </Link>
        <Link to="/services/financial-analysis" className="dp-title">
          Financial Analysis {"&"} Risk Management
        </Link>
        <Link to="/services/programming" className="dp-title">
          Programming
        </Link>
        <Link to="/services/business-plans" className="dp-title">
          Business Plans {"&"} Investment Opportunities
        </Link>
        <Link to="/services/sustainability-management" className="dp-title">
          Sustainability Management
        </Link>
      </div>
    </div>
  );
};

const CareersDropdown = () => {
  const dpContentRef = useRef(null);
  useEffect(() => {
    const dpContent = dpContentRef.current;
    const handleMouseEnter = () => {
      dpContent.style.display = "flex";
      const buffer = 5;
      const dpContentRect = dpContent.getBoundingClientRect();
      if (dpContentRect.right > window.innerWidth - buffer) {
        dpContent.style.left = "auto";
        dpContent.style.right = "0";
      } else {
        dpContent.style.left = "";
        dpContent.style.right = "";
      }
    };
    const handleMouseLeave = () => {
      dpContent.style.display = "none";
    };
    const dpElement = dpContent.parentElement;
    dpElement.addEventListener("mouseenter", handleMouseEnter);
    dpElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      dpElement.removeEventListener("mouseenter", handleMouseEnter);
      dpElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  useEffect(() => {
    const dpElement = dpContentRef.current.parentElement;
    const handleC = () => {};
    const handleML = () => {
      dpElement.addEventListener("click", handleC);
    };
    const handleME = () => {
      dpElement.removeEventListener("click", handleC);
    };
    dpElement.addEventListener("mouseover", handleML);
    dpElement.addEventListener("mouseleave", handleME);
  }, []);

  return (
    <div className="dp-content dp-careers" ref={dpContentRef}>
      <Link to="/careers/overview" className="dp-col">
        <div className="dp-title">Overview</div>
      </Link>

      <Link to="/careers/job-search" className="dp-col">
        <div className="dp-title">Job Search</div>
      </Link>

      <Link to="/careers/employees" className="dp-col">
        <div className="dp-title">Our Employees</div>
      </Link>
    </div>
  );
};

const AboutDropdown = () => {
  const dpContentRef = useRef(null);
  useEffect(() => {
    const dpContent = dpContentRef.current;
    const handleMouseEnter = () => {
      dpContent.style.display = "flex";
      const buffer = 5;
      const dpContentRect = dpContent.getBoundingClientRect();
      if (dpContentRect.right > window.innerWidth - buffer) {
        dpContent.style.left = "auto";
        dpContent.style.right = "0";
      } else {
        dpContent.style.left = "";
        dpContent.style.right = "";
      }
    };
    const handleMouseLeave = () => {
      dpContent.style.display = "none";
    };
    const dpElement = dpContent.parentElement;
    dpElement.addEventListener("mouseenter", handleMouseEnter);
    dpElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      dpElement.removeEventListener("mouseenter", handleMouseEnter);
      dpElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  useEffect(() => {
    const dpElement = dpContentRef.current.parentElement;
    const handleC = () => {};
    const handleML = () => {};
    const handleME = () => {};
    dpElement.addEventListener("mouseover", handleML);
    dpElement.addEventListener("mouseleave", handleME);
  }, []);

  return (
    <div className="dp-content dp-about" ref={dpContentRef}>
      <Link to="/about-us/overview" className="dp-col">
        <div className="dp-title">Overview</div>
      </Link>

      <Link to="/about-us/our-story" className="dp-col">
        <div className="dp-title">Our Story</div>
      </Link>

      <Link to="/about-us/sustainability" className="dp-col">
        <div className="dp-title">Sustainability</div>
      </Link>

      <Link to="/about-us/projects" className="dp-col">
        <div className="dp-title">Featured Projects</div>
      </Link>
    </div>
  );
};

export { DropdownContent, CareersDropdown, AboutDropdown };
