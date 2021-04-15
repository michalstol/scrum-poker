import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import Navigator from './Navigator';

interface RouterInterface {
    children: React.ReactNode;
}

export default function Router({ children }: RouterInterface): JSX.Element {
    return (
        <RecoilRoot>
            <Navigator />
            {children}
        </RecoilRoot>
    );
}
