import React, { useState } from 'react';

import { auth } from './../../firebase/firebase';

import Form from './../form-components/Form';
import Input from './../form-components/Input';
import Button from './../form-components/Button/Button';

interface ChangePasswordInterface {
    setError: React.Dispatch<React.SetStateAction<string>>;
    setFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangePassword({
    setError,
    setFinish,
}: ChangePasswordInterface) {
    const { currentUser } = auth;

    const [preventForm, setPreventForm] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (preventForm) return;
        if (!password || !repeatPassword || !currentUser) return;
        if (password !== repeatPassword) {
            setError(`Passwords don't match.`);

            return;
        }

        setPreventForm(true);

        currentUser
            .updatePassword(password)
            .then(() => setFinish(true)) // for reauthenticate
            .catch((fError: firebase.auth.AuthError) => {
                setError(fError.message);
                setPreventForm(false);
            });
    };

    return (
        <Form onSubmit={submitHandler}>
            <Input
                type="password"
                name="password"
                placeholder="Set new password"
                autoComplete="new-password"
                minLength={8}
                required={true}
                value={password}
                setValue={setPassword}
                disabled={preventForm}
            />
            <Input
                type="password"
                name="repeat-password"
                placeholder="Repeat password"
                autoComplete="new-password"
                minLength={8}
                required={true}
                value={repeatPassword}
                setValue={setRepeatPassword}
                disabled={preventForm}
            />

            <Button variant="distance" disabled={preventForm}>
                Save new password
            </Button>
        </Form>
    );
}
