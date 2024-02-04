// useScroll.js

import { useState, useEffect } from 'react';

export default function useScroll() {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollTop(st <= 0 ? 0 : st);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return isHidden;
}