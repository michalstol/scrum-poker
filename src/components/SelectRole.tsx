import React, { useState, useEffect } from 'react';
import firebase, { firestore } from 'firebase';

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
import Button from './form-components/Button/Button';

interface SelectRoleInterface extends UpdateContextInterface, RoomIDInterface {}

export default function SelectRole({
    updateContext,
    roomID,
}: SelectRoleInterface): any {
    const { uid = undefined, displayName = undefined }: any =
        auth.currentUser || {};

    const dbRoom: firestore.DocumentReference<firestore.DocumentData> = db
        .collection('rooms')
        .doc(roomID);

    const dbUser: firestore.CollectionReference = db
        .collection('rooms')
        .doc(roomID)
        .collection('users');

    const [preventForm, setPreventForm] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState('');

    const saveUser = async () => {
        const newRole = { role: userRole };
        const docExist: boolean = await dbRoom
            .get()
            .then((doc: firestore.DocumentSnapshot) => {
                if (!doc.exists) {
                    setPreventForm(false);
                    setError(
                        `Room with this ID number "${roomID}" does not exist!`
                    );

                    return false;
                }

                return true;
            })
            .catch((fError: firebase.firestore.FirestoreError) => {
                setPreventForm(false);
                setError(fError.message);

                return false;
            });

        if (!docExist) return;

        dbUser
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
            .catch((fError: firebase.firestore.FirestoreError) => {
                setPreventForm(false);
                setError(fError.message);
            });
    };

    useEffect(() => {
        if (!uid) return;
        if (!userRole && roles.indexOf(userRole) === -1) return;
        if (!preventForm) return;

        saveUser();
    }, [userRole]);

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const selectRoleHandler = (role: string) => {
        if (role === userRole) return;
        if (preventForm) return;

        setPreventForm(true);
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
                        variant="distance-small"
                        type="button"
                        disabled={preventForm}
                        onClick={() => selectRoleHandler(role)}
                    >
                        {role}
                    </Button>
                ))}
            </Form>
        </Container>
    );
}
