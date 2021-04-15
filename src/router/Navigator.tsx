import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useWindowLocation from '../hooks/useWindowLocation';

import { routerState } from './index';

export default function Navigator(): null {
    const [url, setURL] = useRecoilState(routerState);
    const location = useWindowLocation();

    useEffect(() => {
        console.log({ url, location });
        setURL(location);
    }, [location]);

    return null;
}
