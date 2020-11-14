import React, { useState, useEffect } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: -1,
        height: -1,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
