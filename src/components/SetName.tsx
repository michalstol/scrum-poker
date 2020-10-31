import React, { useState, useEffect } from 'react';

import { auth } from './../firebase/firebase';

import { UpdateContextInterface } from './../contexts/AppContext';

import Input from './form-components/Input';
import Button from './form-components/Button';

export default function SetName({ updateContext }: UpdateContextInterface) {
    const [name, setName] = useState('');

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (name !== '' && name.length >= 3 && auth.currentUser) {
            auth.currentUser
                .updateProfile({
                    displayName: name,
                })
                .then(() => {
                    updateContext(
                        {
                            userName: name,
                        },
                        true
                    );
                });
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <Input
                type="text"
                name="name"
                value={name}
                placeholder="Set your name"
                minLength={3}
                setValue={setName}
            />

            <Button>Save</Button>
        </form>
    );
}
