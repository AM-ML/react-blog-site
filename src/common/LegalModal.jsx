import React, { useEffect } from "react";
import "../css/common/legal-modal.css";

const LegalModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2>{title}</h2>
          <button className="legal-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="legal-modal-content">
          {children}
        </div>
        <div className="legal-modal-footer">
          <button className="legal-modal-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal; 