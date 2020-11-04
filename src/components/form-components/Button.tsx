import React from 'react';

interface ButtonInterface {
    children: any;
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    variation?:
        | ''
        | 'active'
        | 'button--distance'
        | 'button--distance-small'
        | 'button--secondary';
    disabled?: boolean;
    onClick?: (event: React.FormEvent) => void;
}

export default function Button({
    children,
    type = 'submit',
    active,
    variation,
    disabled,
    onClick = () => {},
}: ButtonInterface): any {
    return (
        <button
            type={type}
            className={`button ${variation} ${active ? 'active' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
