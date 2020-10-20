import React, { useState } from 'react';
import firebase from 'firebase';

import { auth } from '../firebase/firebase';

import Input from './form-component/Input';
import Button from './form-component/Button';

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
        <form onSubmit={submitHandler}>
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
        </form>
    );
}
