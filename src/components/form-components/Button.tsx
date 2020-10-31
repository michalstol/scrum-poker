import React from 'react';

import styles from './../../styles/button.module.scss';

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
        <button type={type} className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
}
