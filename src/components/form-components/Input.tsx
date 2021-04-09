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
    disabled?: boolean;
    autoComplete?:
        | undefined
        | 'off'
        | 'on'
        | 'name'
        | 'email'
        | 'username'
        | 'new-password'
        | 'current-password'
        | 'one-time-code';
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({ setValue, label, ...all }: InputInterface) {
    return (
        <fieldset className="fieldset">
            {label && <label className="fieldset-label">{label}</label>}
            <input
                {...all}
                className="input"
                onChange={function ({ target }) {
                    const { value } = target;

                    if (!setValue) return;

                    switch (all.type) {
                        case 'email':
                            setValue(value.toLocaleLowerCase().trim());
                            break;
                        case 'password':
                            setValue(value);
                            break;
                        default:
                            setValue(value);
                    }
                }}
            />
            <div className="input-border"></div>
        </fieldset>
    );
}
