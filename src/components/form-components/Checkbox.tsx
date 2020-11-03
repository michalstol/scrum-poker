import React from 'react';

interface CheckboxInterface {
    value: string;
    label: string | number;
    selected: boolean;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Checkbox({
    value,
    label,
    selected,
    setValue,
}: CheckboxInterface) {
    return (
        <div
            className={`checkbox ${selected && 'selected'}`}
            onClick={() => setValue(value)}
        >
            {label}
        </div>
    );
}
