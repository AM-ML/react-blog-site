import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately reset the scroll position
    document.documentElement.scrollTop = 0; // For most browsers
    document.body.scrollTop = 0; // For Safari or older browsers
  }, [pathname]);

  return null;
}

export default ScrollToTop;
