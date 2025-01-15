import { useEffect, useState } from 'react';

/**
 * Custom hook for handling animations with enhanced functionality
 * @param {Object} options - Animation options
 * @param {boolean} options.shouldAnimate - Whether the animation should play
 * @param {number} options.duration - Animation duration in milliseconds
 * @param {string} options.timing - Animation timing function
 * @param {number} options.delay - Animation delay in milliseconds
 * @returns {Object} Animation state and controls
 */
function useAnimation({
  shouldAnimate = true,
  duration = 300,
  timing = 'ease',
  delay = 0
} = {}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (shouldAnimate && !hasAnimated) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setHasAnimated(true);
      }, duration + delay);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, duration, delay, hasAnimated]);

  const style = {
    transition: `all ${duration}ms ${timing} ${delay}ms`,
  };

  const reset = () => {
    setHasAnimated(false);
    setIsAnimating(false);
  };

  return {
    isAnimating,
    hasAnimated,
    style,
    reset,
  };
}

export default useAnimation;
