/**
 * Handles revealing elements as they scroll into view
 */

export const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  };
  
  const observer = new IntersectionObserver(revealCallback, revealOptions);
  
  if (revealElements.length > 0) {
    revealElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  return observer; // Return the observer in case we need to disconnect it later
};

/**
 * Apply reveal classes to elements dynamically
 * @param {string} selector - CSS selector for target elements
 * @param {string} revealClass - Class to apply ('reveal', 'reveal-left', etc.)
 * @param {boolean} staggered - Whether to add staggered delays
 */
export const applyRevealToElements = (selector, revealClass = 'reveal', staggered = false) => {
  const elements = document.querySelectorAll(selector);
  
  if (elements.length > 0) {
    elements.forEach((element, index) => {
      element.classList.add(revealClass);
      
      // Add staggered delay if requested
      if (staggered && index < 5) {
        element.classList.add(`delay-${(index + 1) * 100}`);
      } else if (staggered) {
        element.classList.add('delay-500');
      }
    });
  }
  
  // Initialize observer for newly added elements
  return initScrollReveal();
}; 