import React, { useState, useEffect } from 'react';

import { auth } from '../firebase/firebase';

import { UpdateContextInterface } from '../contexts/AppContext';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import ChangeName from './first-visit-components/ChangeName';
import ChangePassword from './first-visit-components/ChangePassword';

export default function FirstVisit({ updateContext }: UpdateContextInterface) {
    const [name, setName] = useState('');
    const [alert, setAlert] = useState('');
    const [finish, setFinish] = useState(false);

    useEffect(() => {
        if (!finish) return;

        updateContext({
            userName: name,
            reset: true,
        });

        auth.signOut();
    }, [finish]);

    return (
        <Container flex="end">
            <Alert
                type={finish ? 'success' : 'error'}
                content={alert}
                setAlert={setAlert}
            />

            <Header
                title="You first time here! Please, set your name and a new password."
                subtitle="The new one!"
            />

            {!name && !finish && (
                <ChangeName setError={setAlert} setNewName={setName} />
            )}
            {name && !finish && (
                <ChangePassword setError={setAlert} setFinish={setFinish} />
            )}
        </Container>
    );
}
