import React, { useState, useEffect } from 'react';
import { Frame, Page } from 'framer';
import { firestore } from 'firebase';

import { auth, db } from '../../firebase/firebase';

import { scrumPoints } from '../../helpers/scrum';

import { RoomIDInterface } from '../../contexts/AppContext';

import Container from './../Container';
import Form from '../form-components/Form';
import Select from '../form-components/Select';
import Button from '../form-components/Button';

export default function RoomPlayer({ roomID }: RoomIDInterface) {
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

    const selectHandler = (index: number) => {
        setBet(scrumPoints[index]);
    };

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setVoted(true);
    };

    return (
        <Container flex="end">
            <Page
                top={-10}
                left={-30}
                right={-30}
                bottom={50}
                padding={30}
                momentum
                gap={31}
                defaultEffect="pile"
                onChangePage={index => setBet(scrumPoints[index])}
            >
                {scrumPoints.map((amount, index) => (
                    <Frame
                        key={`balot-id-${index}`}
                        animate={{
                            translateX: [`-${index}00%`, '0%'],
                            transition: {
                                delay: 1,
                            },
                        }}
                        backgroundColor="transparent"
                    >
                        <div className="card">
                            <div className="card__number">{amount}</div>
                        </div>
                    </Frame>
                ))}
            </Page>

            <Form onSubmit={submitHandler}>
                <Button>Vote!</Button>
            </Form>
        </Container>
    );
}
