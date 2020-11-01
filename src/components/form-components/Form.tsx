import React from 'react';

interface FormInterface {
    children: any;
    extraClasses?: string;
    onSubmit: (event: React.FormEvent) => void;
}

export default function Form({ children, onSubmit }: FormInterface): any {
    return (
        <form onSubmit={onSubmit} className="form">
            {children}
        </form>
    );
}
