"use client";

import { motion } from "framer-motion";

const AnimationWrapper = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 20 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
