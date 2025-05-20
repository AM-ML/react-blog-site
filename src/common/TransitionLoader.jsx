import { useState, useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import { motion, AnimatePresence } from "framer-motion";
import "../css/common/transition-loader.css";

const TransitionLoader = () => {
  const { shouldShowLoader } = useNavigation();
  const [progress, setProgress] = useState(0);
  
  // Simulate progress for the loading bar
  useEffect(() => {
    let animationFrame;
    let startTime;
    
    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Complete in about 2 seconds maximum
      const duration = 2000;
      const newProgress = Math.min(95, (elapsed / duration) * 100);
      
      setProgress(newProgress);
      
      if (shouldShowLoader && elapsed < duration) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else if (!shouldShowLoader) {
        // Quickly complete to 100% when navigation ends
        setProgress(100);
      }
    };
    
    if (shouldShowLoader) {
      startTime = null;
      setProgress(0);
      animationFrame = requestAnimationFrame(animateProgress);
    } else if (progress > 0 && progress < 100) {
      // Quickly finish the animation when shouldShowLoader becomes false
      setProgress(100);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [shouldShowLoader, progress]);
  
  return (
    <AnimatePresence>
      {(shouldShowLoader || (progress > 0 && progress < 100)) && (
        <motion.div 
          className="transition-loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.3 }}
        >
          <div className="transition-loader-content">
            <div className="transition-logo">
              <span className="text-logo text-serif text-bolder">BOFFO</span>
            </div>
            
            <div className="transition-loading-bar-container">
              <motion.div 
                className="transition-loading-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="transition-loading-spinner">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionLoader; 