import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { db } from '../../firebase/firebase';

import { scrumPoints } from '../../helpers/scrum';

import { RoomIDInterface } from '../../contexts/AppContext';

import Alert from './../Alert';
import Container from './../Container';
import RoomTable from './RoomTable';
import Form from '../form-components/Form';
import Button from '../form-components/Button';

const resetUserData = {
    bet: scrumPoints[0],
    voted: false,
};

export default function RoomCroupier({ roomID }: RoomIDInterface) {
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');
    const [usersIDs, setUsersIDs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (usersIDs.length) return;

        const batch = db.batch();

        for (let id of usersIDs) {
            batch.update(dbUsers.doc(id), { ...resetUserData });
        }

        batch
            .commit()
            .catch((fError: firestore.FirestoreError) =>
                setError(fError.message)
            );
    }, [usersIDs]);

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        dbUsers
            .where('voted', '==', true)
            .get()
            .then((snap: firestore.QuerySnapshot) => {
                const ids: any = [];

                snap.forEach((doc: firestore.DocumentSnapshot) => {
                    if (doc.exists) ids.push(doc.id);
                });

                setUsersIDs(ids);
            })
            .catch((fError: firestore.FirestoreError) => {
                setError(fError.message);
                return [];
            });
    };

    return (
        <Container flex="end">
            <Form onSubmit={submitHandler}>
                <Button>Reset</Button>
            </Form>
        </Container>
    );
}
