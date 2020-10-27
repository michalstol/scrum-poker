import React from 'react';

interface SelectInterface {
    label?: string;
    children: any;
    value: string | number;
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export default function Select({
    label,
    children,
    value,
    onChange,
}: SelectInterface) {
    return (
        <fieldset>
            {label && <label>{label}</label>}
            <select value={value} onChange={onChange}>
                {children}
            </select>
        </fieldset>
    );
}
