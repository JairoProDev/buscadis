// useIntersectionObserver.js

import { useEffect } from 'react';

function useIntersectionObserver(ref, loadMore, hasMore, isLoading) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting) {
                    loadMore();
                }
            }, 
            { threshold: 1 }
        );
        const currentRef = ref.current;
        if (currentRef && hasMore && !isLoading) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, loadMore, hasMore, isLoading]);
}

export default useIntersectionObserver;