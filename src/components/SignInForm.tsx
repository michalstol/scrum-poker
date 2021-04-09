import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import { auth } from '../firebase/firebase';

import { ResetInterface } from '../contexts/AppContext';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import Form from './form-components/Form';
import Input from './form-components/Input';
import Button from './form-components/Button';

const emailLength: number = 5;
const passwordLength: number = 8;

interface SignInInterface extends ResetInterface {
    clearReset: Function;
}

export default function SignInForm({
    reset = false,
    clearReset = () => {},
}: SignInInterface): any {
    const [preventForm, setPreventForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!!reset) return;

        clearReset();
    }, []);

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (preventForm) return;
        setPreventForm(true);

        auth.signInWithEmailAndPassword(email, password)
            .catch((fError: firebase.auth.AuthError) =>
                setError(fError.message)
            )
            .finally(() => setPreventForm(false));
    };

    return (
        <>
            <Container flex="end">
                <Alert type="error" content={error} setAlert={setError} />

                <Header
                    title="Let's play scrum poker remotely with your team."
                    subtitle="Welcome!"
                />

                <Form onSubmit={submitHandler}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail address"
                        autoComplete="email"
                        minLength={emailLength}
                        required={true}
                        value={email}
                        setValue={setEmail}
                        disabled={preventForm}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        minLength={passwordLength}
                        required={true}
                        value={password}
                        setValue={setPassword}
                        disabled={preventForm}
                    />

                    <Button
                        variation="button--distance"
                        disabled={
                            preventForm ||
                            !email ||
                            email.length < emailLength ||
                            !password ||
                            password.length < passwordLength
                        }
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}
