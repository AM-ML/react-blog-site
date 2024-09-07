import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/components/navbar-dropdown.css";

export const DropdownContent = () => {
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
    const handleC = () => {
      dpContentRef.current.style.display = "none";

    }
    const handleML = () => {
      dpElement.addEventListener("click",  handleC);
    }
    const handleME = () => {
      dpElement.removeEventListener("click", handleC);
    }
    dpElement.addEventListener("mouseover", handleML);
    dpElement.addEventListener("mouseleave", handleME);
  }, []);

  return (
    <div className="dp-content" ref={dpContentRef}>
      <div className="dp-col">
        <Link to="/dadv" className="dp-title d-block">Financial Advisory</Link>
        <Link to="/dadv" className="dp-text">Financial Analysis</Link>
        <Link to="/dadv" className="dp-text">Feasibility Study</Link>
        <Link to="/dadv" className="dp-text">Business Plans</Link>
      </div>
      <div className="dp-col">
        <Link to="/dadv" className="dp-title">Design Advisory</Link>
        <Link to="/dadv" className="dp-text">Interior / Exterior Design</Link>
        <Link to="/dadv" className="dp-text">Architecture Drawing</Link>
        <Link to="/dadv" className="dp-text">Graphic Design</Link>
      </div>
      <div className="dp-col">
        <Link to="/dadv" className="dp-title">Brick Advisory</Link>
        <Link to="/dadv" className="dp-text">Civil Engineering</Link>
        <Link to="/dadv" className="dp-text">Construction</Link>
        <Link to="/dadv" className="dp-text">Procurement</Link>
      </div>
      <div className="dp-col">
        <Link to="/dadv" className="dp-title">Management Handling</Link>
        <Link to="/dadv" className="dp-text">Project Management</Link>
        <Link to="/dadv" className="dp-text">Waste Management</Link>
        <Link to="/dadv" className="dp-text">Alternative</Link>
      </div>
      <div className="dp-col">
        <Link to="/dadv" className="dp-title">Sustainability</Link>
        <Link to="/dadv" className="dp-text"></Link>
        <Link to="/dadv" className="dp-text"></Link>
        <Link to="/dadv" className="dp-text"></Link>
      </div>
    </div>
  );
};

