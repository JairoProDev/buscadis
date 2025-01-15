import { useState, useEffect } from 'react';

/**
 * Custom hook for intersection observer with enhanced functionality
 * @param {React.RefObject} elementRef - Reference to the element to observe
 * @param {Function} loadMore - Function to load more items
 * @param {boolean} hasMore - Boolean indicating if there are more items to load
 * @param {boolean} isLoading - Boolean indicating if data is currently being loaded
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0 to 1)
 * @param {string} options.rootMargin - Margin around the root
 * @param {Element|Document} options.root - The element used as viewport
 * @returns {Object} Intersection observer entry
 */
function useIntersectionObserver(
  elementRef,
  loadMore,
  hasMore,
  isLoading,
  {
    threshold = 0,
    root = null,
    rootMargin = '0px',
  } = {}
) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const node = elementRef?.current;
    if (!node || typeof IntersectionObserver !== 'function') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, loadMore, hasMore, isLoading, JSON.stringify({ threshold, root, rootMargin })]);

  return entry;
}

export default useIntersectionObserver;
