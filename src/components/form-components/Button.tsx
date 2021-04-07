import React from 'react';
import { motion } from 'framer';

interface ButtonInterface {
    children: any;
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    variation?:
        | ''
        | 'active'
        | 'button--distance'
        | 'button--distance-small'
        | 'button--secondary'
        | 'button--revers';
    disabled?: boolean;
    onClick?: (event: MouseEvent | TouchEvent | PointerEvent) => void;
}

export default function Button({
    children,
    type = 'submit',
    active,
    variation = '',
    disabled,
    onClick = () => {},
}: ButtonInterface): any {
    return (
        <motion.button
            type={type}
            className={`button ${variation} ${active ? 'active' : ''}`.trim()}
            onTap={onClick}
            whileTap={{ scale: disabled ? 1 : 0.9 }}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
