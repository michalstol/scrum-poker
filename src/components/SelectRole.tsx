import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import { auth, db } from './../firebase/firebase';

import {
    UpdateContextInterface,
    RoomIDInterface,
} from './../contexts/AppContext';
import { defaultRoomUser, roles } from './../contexts/RoomContext';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import Form from './form-components/Form';
import Button from './form-components/Button';

interface SelectRoleInterface extends UpdateContextInterface, RoomIDInterface {}

export default function SelectRole({
    updateContext,
    roomID,
}: SelectRoleInterface): any {
    const { uid, displayName }: any = auth.currentUser;
    const dbRoom = db.collection('rooms').doc(roomID).collection('users');
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!uid) return;
        if (!userRole && roles.indexOf(userRole) === -1) return;

        const newRole = { role: userRole };

        dbRoom
            .doc(uid)
            .set({
                ...defaultRoomUser,
                ...newRole,
                uid,
                name: displayName,
            })
            .then(() => {
                updateContext({ ...newRole }, true);
            })
            .catch((fError: firebase.firestore.FirestoreError) =>
                setError(fError.message)
            );
    }, [userRole]);

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const selectRoleHandler = (role: string) => {
        if (role === userRole) return;

        setUserRole(role);
    };

    return (
        <Container flex="end">
            <Alert type="error" content={error} setAlert={setError} />

            <Header
                title="Select your role for the next game."
                subtitle="Last step!"
            />

            <Form onSubmit={submitHandler}>
                {roles.map((role, index) => (
                    <Button
                        key={`select-role-${index}`}
                        type="button"
                        variation="button--distance-small"
                        onClick={() => selectRoleHandler(role)}
                    >
                        {role}
                    </Button>
                ))}
            </Form>
        </Container>
    );
}
