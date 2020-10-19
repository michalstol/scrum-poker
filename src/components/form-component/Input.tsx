import React from 'react';

interface InputInterface {
    type: string,
    name: string,
    id?: string,
    placeholder?: string,
    onChange(): any
}

export default function Input({type, name, id, placeholder, onChange} : InputInterface) {
    return (
        <fieldset>
            <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            />
        </fieldset>
    );
}