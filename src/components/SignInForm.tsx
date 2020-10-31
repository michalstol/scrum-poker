import React, { useState } from 'react';
import firebase from 'firebase';

import { auth } from '../firebase/firebase';

import Form from './form-components/Form';
import Input from './form-components/Input';
import Button from './form-components/Button';

export default function SignInForm(): any {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
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
        <Form onSubmit={submitHandler}>
            <Input
                type="email"
                name="email"
                placeholder="E-mail address"
                minLength={5}
                value={email}
                setValue={setEmail}
            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                minLength={5}
                value={password}
                setValue={setPassword}
            />

            <Button>Submit</Button>

            {!!error && <div>{error}</div>}
        </Form>
    );
}
