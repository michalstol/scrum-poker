import React from 'react';

import { redirect } from './index';

interface LinkInterface {
    href: string;
    children: React.ReactNode;
}

export default function Link({ href, children }: LinkInterface): JSX.Element {
    return <button onClick={() => redirect(href)}>{children}</button>;
}
