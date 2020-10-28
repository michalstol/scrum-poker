import React from 'react';

interface InputInterface {
    type: string;
    name: string;
    value: string;
    label?: string;
    id?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({ setValue, label, ...all }: InputInterface) {
    return (
        <fieldset>
            {label && <label>{label}</label>}
            <input
                {...all}
                onChange={function (event) {
                    setValue(event.target.value);
                }}
            />
        </fieldset>
    );
}
