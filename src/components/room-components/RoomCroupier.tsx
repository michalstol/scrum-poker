import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { db } from '../../firebase/firebase';

import { scrumPoints } from '../../helpers/scrum';

import { RoomComponentInterface } from '../../contexts/RoomContext';

import Alert from './../Alert';
import Container from './../Container';
import RoomTable from './RoomTable';
import Form from '../form-components/Form';
import Button from '../form-components/Button';

const resetUserData = {
    bet: scrumPoints[0],
    voted: false,
};

export default function RoomCroupier({
    roomID,
    roomName,
}: RoomComponentInterface) {
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');
    const [reset, setReset] = useState(false);
    const [usersIDs, setUsersIDs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!usersIDs.length) return;

        const batch = db.batch();

        for (let id of usersIDs) {
            batch.update(dbUsers.doc(id), { ...resetUserData });
        }

        batch
            .commit()
            .catch((fError: firestore.FirestoreError) =>
                setError(fError.message)
            )
            .finally(() => setReset(false));
    }, [usersIDs]);

    useEffect(() => {
        if (!reset) return;

        dbUsers
            .where('voted', '==', true)
            .get()
            .then((snap: firestore.QuerySnapshot) => {
                const ids: any = [];

                if (!snap.size) {
                    setReset(false);
                    setError(
                        `Unfortunately, no one voted, so there's no need to reset.`
                    );

                    return;
                }

                snap.forEach((doc: firestore.DocumentSnapshot) => {
                    if (doc.exists) ids.push(doc.id);
                });

                setUsersIDs(ids);
            })
            .catch((fError: firestore.FirestoreError) => {
                setError(fError.message);
            });
    }, [reset]);

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setReset(true);
    };

    return (
        <Container flex="end">
            <Alert type="error" content={error} setAlert={setError} />

            <RoomTable roomID={roomID} roomName={roomName} />

            <Form onSubmit={submitHandler}>
                <Button disabled={reset}>Reset</Button>
            </Form>
        </Container>
    );
}
