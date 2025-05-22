/**
 * Optimized scroll reveal functionality with better performance
 * - Uses more efficient IntersectionObserver options
 * - Limits DOM updates and reflows
 * - Implements throttling for better performance
 */

// Throttle function to limit execution rate
const throttle = (callback, delay = 100) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};

// Main IntersectionObserver instance to be reused
let globalObserver = null;

export const initScrollReveal = () => {
  // Clean up existing observer if present
  if (globalObserver) {
    globalObserver.disconnect();
  }
  
  // Use requestAnimationFrame to avoid layout thrashing
  requestAnimationFrame(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) return null;
    
    // More performant observer options - smaller rootMargin and higher threshold
    const revealOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const revealCallback = throttle((entries, observer) => {
      // Batch DOM updates with requestAnimationFrame
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
          }
        });
      });
    }, 50); // Throttle to once every 50ms
    
    globalObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    // Observe in batches to avoid too many operations at once
    const batchSize = 15;
    let batchCount = 0;
    
    const observeNextBatch = () => {
      const start = batchCount * batchSize;
      const end = Math.min(start + batchSize, revealElements.length);
      
      for (let i = start; i < end; i++) {
        globalObserver.observe(revealElements[i]);
      }
      
      batchCount++;
      
      if (end < revealElements.length) {
        // Schedule next batch with requestIdleCallback if available
        if (window.requestIdleCallback) {
          window.requestIdleCallback(observeNextBatch, { timeout: 200 });
        } else {
          setTimeout(observeNextBatch, 10);
        }
      }
    };
    
    observeNextBatch();
  });
  
  return globalObserver;
};

/**
 * Optimized function to apply reveal classes to elements dynamically
 * @param {string} selector - CSS selector for target elements
 * @param {string} revealClass - Class to apply ('reveal', 'reveal-left', etc.)
 * @param {boolean} staggered - Whether to add staggered delays
 */
export const applyRevealToElements = (selector, revealClass = 'reveal', staggered = false) => {
  // Use requestAnimationFrame for DOM updates
  requestAnimationFrame(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return null;
    
    // Update classes in batches
    const updateClasses = (startIdx, endIdx) => {
      for (let i = startIdx; i < endIdx; i++) {
        const element = elements[i];
        element.classList.add(revealClass);
        
        // Add staggered delay if requested - with efficient delay calculation
        if (staggered) {
          // Cap at 250ms maximum delay (5 steps of 50ms)
          const delayValue = Math.min((i % 5 + 1) * 50, 250);
          element.style.transitionDelay = `${delayValue}ms`;
        }
      }
      
      // Process next batch if needed
      if (endIdx < elements.length) {
        requestAnimationFrame(() => {
          updateClasses(endIdx, Math.min(endIdx + 10, elements.length));
        });
      } else {
        // All elements processed, initialize observer
        initScrollReveal();
      }
    };
    
    // Start processing in batches of 10
    updateClasses(0, Math.min(10, elements.length));
  });
  
  return globalObserver;
}; 