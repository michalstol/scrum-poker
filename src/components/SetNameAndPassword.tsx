import React, { useState } from 'react';

import { auth } from '../firebase/firebase';

import { UpdateContextInterface } from '../contexts/AppContext';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import Form from './form-components/Form';
import Input from './form-components/Input';
import Button from './form-components/Button';

export default function SetNameAndPassword({
    updateContext,
}: UpdateContextInterface) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        const { currentUser } = auth;

        if (!name || !password || !repeatPassword) return;
        if (!currentUser) return;

        if (password !== repeatPassword) {
            setError(`Passwords don't match`);

            return;
        }

        const promises = [];

        promises.push(currentUser.updatePassword(password));
        promises.push(
            currentUser.updateProfile({
                displayName: name,
            })
        );

        Promise.all(promises)
            .then(() => {
                setName('');
                setPassword('');
                setRepeatPassword('');

                updateContext(
                    {
                        userName: name,
                    },
                    true
                );

                auth.signOut(); // for reauthenticate
            })
            .catch((fError: firebase.auth.AuthError) =>
                setError(fError.message)
            );
    };

    return (
        <Container flex="end">
            <Alert type="error" content={error} setAlert={setError} />

            <Header
                title="You first time here! Please, set your name and a new password."
                subtitle="The new one!"
            />

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
                <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Set new password"
                    minLength={5}
                    required={true}
                    setValue={setPassword}
                />
                <Input
                    type="password"
                    name="repeat-password"
                    value={repeatPassword}
                    placeholder="Repeat password"
                    minLength={5}
                    required={true}
                    setValue={setRepeatPassword}
                />

                <Button variation="button--distance">Save</Button>
            </Form>
        </Container>
    );
}
