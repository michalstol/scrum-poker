import React, { useState, useEffect } from 'react';

import { auth } from './../../firebase/firebase';

import Form from './../form-components/Form';
import Input from './../form-components/Input';
import Button from './../form-components/Button/Button';

interface ChangeNameInterface {
    setNewName: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChangeName({
    setError,
    setNewName,
}: ChangeNameInterface) {
    const { currentUser } = auth;

    const [preventForm, setPreventForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (!success) return;

        setNewName(name);
    }, [success]);

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (preventForm) return;
        if (!name || !currentUser) return;

        setPreventForm(true);

        currentUser
            .updateProfile({
                displayName: name,
            })
            .then(() => setSuccess(true))
            .catch((fError: firebase.auth.AuthError) => {
                setError(fError.message);
                setPreventForm(false);
            });
    };

    return (
        <Form onSubmit={submitHandler}>
            <Input
                type="text"
                name="name"
                placeholder="Set your name"
                autoComplete="name"
                minLength={3}
                required={true}
                value={name}
                setValue={setName}
                disabled={preventForm}
            />

            <Button variant="distance" disabled={preventForm}>
                Save name
            </Button>
        </Form>
    );
}
