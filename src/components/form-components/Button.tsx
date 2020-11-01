import React from 'react';

interface ButtonInterface {
    children: any;
    type?: 'submit' | 'reset' | 'button';
    variation?: 'button--distance' | 'button--distance-small';
    disabled?: boolean;
    onClick?: (event: React.FormEvent) => void;
}

export default function Button({
    children,
    type = 'submit',
    variation,
    disabled,
    onClick = () => {},
}: ButtonInterface): any {
    return (
        <button
            type={type}
            className={`button ${variation}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
