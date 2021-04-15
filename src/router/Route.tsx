import React from 'react';
import { useRecoilState } from 'recoil';

import { routerState } from './index';

interface RouteInterface {
    path: string;
    children: React.ReactNode;
}

export default function Route({ path, children }: RouteInterface): JSX.Element {
    const [url] = useRecoilState(routerState);

    if (path !== url) return <></>;
    return <>{children}</>;
}
