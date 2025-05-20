import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Create context
export const NavigationContext = createContext({
  isNavigating: false,
  shouldShowLoader: false,
  startNavigation: () => {},
  endNavigation: () => {},
});

// Define routes that should skip the loading screen (fast-loading routes)
const FAST_LOADING_ROUTES = [
  "/",
  "/search",
  "/blogs",
  "/dashboard",
  "/signin",
  "/signup",
];

// Helper to check if a route should use fast loading
const shouldSkipLoadingForRoute = (path) => {
  return FAST_LOADING_ROUTES.some((route) => path.startsWith(route));
};

export const NavigationProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  // Start navigation with loading
  const startNavigation = (path) => {
    const shouldSkip = shouldSkipLoadingForRoute(path);
    setIsNavigating(true);

    if (!shouldSkip) {
      setShouldShowLoader(true);
    }
  };

  // End navigation
  const endNavigation = () => {
    setIsNavigating(false);
    setShouldShowLoader(false);
  };

  // Track location changes to auto-detect navigation
  useEffect(() => {
    // If not a POP (browser back/forward) navigation, handle route change
    if (navigationType !== "POP") {
      const timeoutId = setTimeout(() => {
        endNavigation();
      }, 1000); // Allow enough time for page transition

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, navigationType]);

  return (
    <NavigationContext.Provider
      value={{
        isNavigating,
        shouldShowLoader,
        startNavigation,
        endNavigation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use the context
export const useNavigation = () => useContext(NavigationContext);

