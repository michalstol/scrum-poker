import React from 'react';

interface ButtonInterface {
    children: any;
    type?: 'submit' | 'reset' | 'button';
}

export default function Button({
    children,
    type = 'submit',
}: ButtonInterface): any {
    return <button type={type}>{children}</button>;
}
