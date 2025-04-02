import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

// Memoize variants to prevent unnecessary re-renders
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const listItemVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  animate: (i) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1 // Stagger delay based on index
    }
  })
};

const AnimationWrapper = ({ 
  children, 
  initial = "initial",
  animate = "animate",
  exit = "exit",
  transition = { duration: 0.5 },
  keyValue,
  className = "",
  isListItem = false,
  index = 0 // Add index prop for staggered animations
}) => {
  // Memoize variants selection
  const variants = useMemo(() => 
    isListItem ? listItemVariants : pageVariants,
    [isListItem]
  );
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        exit={exit}
        variants={variants}
        custom={isListItem ? index : undefined}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;