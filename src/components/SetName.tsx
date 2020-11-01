import React, { useState } from 'react';

import { auth } from './../firebase/firebase';

import { UpdateContextInterface } from './../contexts/AppContext';

import Alert from './Alert';
import Container from './Container';
import Form from './form-components/Form';
import Input from './form-components/Input';
import Button from './form-components/Button';

export default function SetName({ updateContext }: UpdateContextInterface) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

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
                })
                .catch((fError: firebase.auth.AuthError) =>
                    setError(fError.message)
                );
        }
    };

    return (
        <Container flex="end">
            <Alert type="error" content={error} setError={setError} />
            <Form onSubmit={submitHandler}>
                <Input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Set your name"
                    minLength={3}
                    required={true}
                    setValue={setName}
                />

                <Button variation="button--distance">Save</Button>
            </Form>
        </Container>
    );
}
