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
    required?: boolean;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({ setValue, label, ...all }: InputInterface) {
    return (
        <fieldset className="fieldset">
            {label && <label className="fieldset-label">{label}</label>}
            <input
                {...all}
                className="input"
                onChange={function (event) {
                    setValue && setValue(event.target.value);
                }}
            />
            <div className="input-border"></div>
        </fieldset>
    );
}
