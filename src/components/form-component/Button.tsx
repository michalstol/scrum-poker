import React from 'react';

interface ButtonInterface {
    children: any;
    type?: 'submit' | 'reset' | 'button';
    onClick?: (event: React.FormEvent) => void;
}

export default function Button({
    children,
    type = 'submit',
    onClick = () => {},
}: ButtonInterface): any {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
}
