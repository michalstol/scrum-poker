import React from 'react';

import styles from './../../styles/input.module.scss';

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
    const { input, ['input-fieldset']: inputFieldset } = styles;

    return (
        <fieldset className={inputFieldset}>
            {label && <label>{label}</label>}
            <input
                {...all}
                className={input}
                onChange={function (event) {
                    setValue(event.target.value);
                }}
            />
        </fieldset>
    );
}
