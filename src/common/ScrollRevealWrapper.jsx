import React, { useEffect, useRef } from "react";

/**
 * A component that reveals its children when scrolled into view
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be revealed
 * @param {string} props.animation - Animation type: 'fade', 'left', 'right', 'scale'
 * @param {number} props.delay - Delay in ms before animation starts (0-500)
 * @param {boolean} props.noAnimation - Disables animation (for SSR or when animations are turned off)
 * @param {string} props.className - Additional CSS classes
 */
const ScrollRevealWrapper = ({
  children,
  animation = "fade",
  delay = 0,
  noAnimation = false,
  className = "",
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (noAnimation) return;

    // Get animation class based on type
    let animationClass = "reveal"; // default fade up
    if (animation === "left") animationClass = "reveal-left";
    if (animation === "right") animationClass = "reveal-right";
    if (animation === "scale") animationClass = "reveal-scale";

    // Get delay class
    const delayClass =
      delay > 0 ? `delay-${Math.min(Math.floor(delay / 100) * 100, 500)}` : "";

    // Add classes
    if (elementRef.current) {
      elementRef.current.classList.add(animationClass);
      if (delayClass) elementRef.current.classList.add(delayClass);

      // Set up IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(elementRef.current);

      // Cleanup
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
  }, [animation, delay, noAnimation]);

  return (
    <div
      ref={elementRef}
      style={{ height: "max-content" }}
      className={className}
    >
      {children}
    </div>
  );
};

export default ScrollRevealWrapper;

