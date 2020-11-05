import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { auth, db } from './../../firebase/firebase';

import { scrumPoints } from './../../helpers/scrum';

import { RoomIDInterface } from './../../contexts/AppContext';
import { UserInterface } from './../../contexts/RoomContext';

import Form from './../form-components/Form';
import Select from './../form-components/Select';
import Button from './../form-components/Button';

export default function RoomBallot({ roomID }: RoomIDInterface) {
    const { uid }: any = auth.currentUser;
    const dbCurrentUser = db
        .collection('rooms')
        .doc(roomID)
        .collection('users')
        .doc(uid);

    const [bet, setBet] = useState(scrumPoints[0]);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        const dbConnection = dbCurrentUser.onSnapshot(
            (doc: firestore.DocumentSnapshot) => {
                if (doc.exists) {
                    const data = doc.data();

                    if (data) {
                        setBet(data.bet);
                        setVoted(data.voted);
                    }
                }
            }
        );

        return dbConnection;
    }, []);

    useEffect(() => {
        if (!voted) return;

        dbCurrentUser.update({
            bet,
            voted,
        });
    }, [voted]);

    const selectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        setBet(Number(event.currentTarget.value));
    };

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setVoted(true);
    };

    return (
        <Form onSubmit={submitHandler}>
            <Select value={bet} onChange={selectHandler}>
                {scrumPoints.map(value => (
                    <option key={`scrum-point-${value}`} value={value}>
                        {value}
                    </option>
                ))}
            </Select>

            <Button>Vote!</Button>
        </Form>
    );
}
