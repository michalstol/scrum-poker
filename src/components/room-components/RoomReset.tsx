import React from 'react';
import { firestore } from 'firebase';

import { db } from './../../firebase/firebase';

import { scrumPoints } from './../../helpers/scrum';

import { RoomIDInterface } from './../../contexts/AppContext';

import Form from './../form-components/Form';
import Button from './../form-components/Button';

const resetUserData = {
    bet: scrumPoints[0],
    voted: false,
};

export default function RoomReset({ roomID }: RoomIDInterface) {
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const usersID: string[] = [];
        const querySnap = await dbUsers
            .where('voted', '==', true)
            .get()
            .then((snap: firestore.QuerySnapshot) => snap);

        querySnap.forEach((doc: firestore.DocumentSnapshot) => {
            if (doc.exists) usersID.push(doc.id);
        });

        if (usersID.length) {
            const batch = db.batch();

            for (let id of usersID) {
                batch.update(dbUsers.doc(id), { ...resetUserData });
            }

            batch.commit();
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <Button>Reset</Button>
        </Form>
    );
}
