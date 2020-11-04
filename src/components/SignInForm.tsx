import React, { useState } from 'react';
import { Frame } from 'framer';
import firebase from 'firebase';

import { auth } from '../firebase/firebase';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import Form from './form-components/Form';
import Input from './form-components/Input';
import Button from './form-components/Button';

export default function SignInForm(): any {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email.toLocaleLowerCase(), password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError('');
            })
            .catch((fError: firebase.auth.AuthError) =>
                setError(fError.message)
            );
    };

    return (
        <>
            <Container flex="end">
                <Alert type="error" content={error} setAlert={setError} />

                <Header
                    title="Let's play scrum poker remotely with our team."
                    subtitle="Welcome!"
                />

                <Form onSubmit={submitHandler}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail address"
                        minLength={5}
                        // required={true}
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        minLength={5}
                        // required={true}
                        value={password}
                        setValue={setPassword}
                    />

                    <Button variation="button--distance">Submit</Button>
                </Form>
            </Container>
        </>
    );
}
