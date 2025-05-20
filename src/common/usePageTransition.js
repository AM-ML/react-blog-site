import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from './NavigationContext';

/**
 * A custom hook that provides navigation with page transition loading.
 * 
 * @returns {Object} An object containing the navigate function
 */
export const usePageTransition = () => {
  const navigate = useNavigate();
  const { startNavigation } = useNavigation();
  
  const navigateWithTransition = useCallback((path) => {
    startNavigation(path);
    navigate(path);
  }, [navigate, startNavigation]);
  
  return {
    navigate: navigateWithTransition
  };
};

export default usePageTransition; 