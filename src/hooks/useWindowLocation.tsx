import { useState, useEffect } from 'react';

export default function useWindowLocation() {
    const [location, setLocation] = useState(window.location.pathname);

    useEffect(() => {
        function getLocation() {
            setLocation(window.location.pathname);
        }

        getLocation();
        window.addEventListener('locationchange', getLocation);

        return () => window.removeEventListener('locationchange', getLocation);
    }, []);

    return location;
}
