import { useState, useEffect, useRef } from "react";
import "../css/common/preloader.css";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(20);
  const progressRef = useRef(20);
  const animationRef = useRef(null);
  const reachedNinetyRef = useRef(false);
  const reachedNinetyFiveRef = useRef(false);
  const timeoutRef = useRef(null);
  const maxLoadingTimeRef = useRef(null);
  
  useEffect(() => {
    // Set up the controlled progress animation
    startProgressAnimation();
    
    // Listen for page load completion
    window.addEventListener('load', handlePageLoad);
    
    // Set a maximum loading time of 8 seconds
    maxLoadingTimeRef.current = setTimeout(() => {
      // Force completion of loading after 8 seconds
      if (visible) {
        const currentProgress = progressRef.current;
        // Quickly animate to completion
        const duration = 500; // Half a second to complete
        const startTime = Date.now();
        
        const finishAnimation = () => {
          const elapsed = Date.now() - startTime;
          if (elapsed < duration) {
            const remaining = 100 - currentProgress;
            const newProgress = currentProgress + (elapsed / duration) * remaining;
            progressRef.current = newProgress;
            setProgress(newProgress);
            requestAnimationFrame(finishAnimation);
          } else {
            progressRef.current = 100;
            setProgress(100);
            setTimeout(() => setVisible(false), 200);
          }
        };
        
        cancelAnimationFrame(animationRef.current);
        requestAnimationFrame(finishAnimation);
      }
    }, 8000);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeoutRef.current);
      clearTimeout(maxLoadingTimeRef.current);
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);
  
  const startProgressAnimation = () => {
    let startTime = Date.now();
    let lastTimestamp = startTime;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastTimestamp;
      lastTimestamp = now;
      
      // Calculate the appropriate increment based on current progress
      let increment = 0;
      
      if (progressRef.current < 30) {
        // Fast initial progress (20-30%)
        increment = (elapsed / 1000) * 10; // 10% per second
      } else if (progressRef.current < 60) {
        // Medium speed (30-60%)
        increment = (elapsed / 1000) * 20; // 20% per second
      } else if (progressRef.current < 80) {
        // Slower (60-80%)
        increment = (elapsed / 1000) * 10; // 10% per second
      } else if (progressRef.current < 90) {
        // Very slow (80-90%)
        increment = (elapsed / 1000) * 5; // 5% per second
      } else if (progressRef.current >= 90 && !reachedNinetyRef.current) {
        // Stop at exactly 90%
        increment = 0;
        reachedNinetyRef.current = true;
        
        // After 3 seconds, proceed to 95%
        timeoutRef.current = setTimeout(() => {
          proceedToNinetyFive();
        }, 3000);
        
        return; // Stop the animation loop
      }
      
      // Apply the increment
      const newProgress = Math.min(90, progressRef.current + increment);
      progressRef.current = newProgress;
      setProgress(newProgress);
      
      // Continue the animation if not at 90% yet
      if (progressRef.current < 90) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const proceedToNinetyFive = () => {
    let startVal = progressRef.current;
    let startTime = Date.now();
    let duration = 1000; // 1 second to reach 95%
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < duration) {
        const remaining = 95 - startVal;
        const newProgress = startVal + (elapsed / duration) * remaining;
        progressRef.current = newProgress;
        setProgress(newProgress);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Stop exactly at 95%
        progressRef.current = 95;
        setProgress(95);
        reachedNinetyFiveRef.current = true;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const handlePageLoad = () => {
    // Only complete if we've reached 95% already
    if (reachedNinetyFiveRef.current) {
      completeLoading();
    } else {
      // If page loaded before reaching 95%, set a listener to complete after reaching 95%
      const checkInterval = setInterval(() => {
        if (reachedNinetyFiveRef.current) {
          clearInterval(checkInterval);
          completeLoading();
        }
      }, 100);
    }
  };
  
  const completeLoading = () => {
    let startVal = progressRef.current;
    let startTime = Date.now();
    let duration = 300; // Fast completion
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < duration) {
        const remaining = 100 - startVal;
        const newProgress = startVal + (elapsed / duration) * remaining;
        progressRef.current = newProgress;
        setProgress(newProgress);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we reach exactly 100%
        progressRef.current = 100;
        setProgress(100);
        
        // Hide the loader after a short delay
        setTimeout(() => {
          setVisible(false);
        }, 200);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  if (!visible) return null;

  return (
    <div className="youtube-style-preloader">
      <div 
        className="loading-bar" 
        style={{ 
          width: `${progress}%`,
          backgroundColor: "#15626c"
        }}
      />
    </div>
  );
};

export default Preloader;