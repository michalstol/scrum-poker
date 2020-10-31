import React from 'react';

import styles from './../../styles/form.module.scss';

interface FormInterface {
    children: any;
    extraClasses?: string;
    onSubmit: (event: React.FormEvent) => void;
}

export default function Form({
    children,
    extraClasses,
    onSubmit,
}: FormInterface): any {
    return (
        <form onSubmit={onSubmit} className={`${styles.form} ${extraClasses}`}>
            {children}
        </form>
    );
}
