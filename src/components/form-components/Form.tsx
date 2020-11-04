import React from 'react';

interface FormInterface {
    children: any;
    classes?: string;
    onSubmit: (event: React.FormEvent) => void;
}

export default function Form({
    children,
    classes = '',
    onSubmit,
}: FormInterface): any {
    return (
        <form onSubmit={onSubmit} className={`form ${classes}`}>
            {children}
        </form>
    );
}
