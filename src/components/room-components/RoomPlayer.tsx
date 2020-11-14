import React, { useState, useEffect } from 'react';
import { Frame, Page } from 'framer';
import { firestore } from 'firebase';

import { auth, db } from '../../firebase/firebase';

import { scrumPoints } from '../../helpers/scrum';

import { RoomComponentInterface } from '../../contexts/RoomContext';

import RoomTable from './RoomTable';
import Card from './Card';
import Container from './../Container';
import Form from '../form-components/Form';
import Button from '../form-components/Button';

export default function RoomPlayer({
    roomID,
    roomName,
}: RoomComponentInterface) {
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

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setVoted(true);
    };

    return (
        <Page
            width="100%"
            height="100%"
            dragEnabled={false}
            currentPage={voted ? 0 : 1}
            contentHeight="stretch"
            direction="vertical"
            // defaultEffect="pile"
        >
            <Frame backgroundColor="transparent">
                <Container flex="end">
                    <RoomTable roomID={roomID} roomName={roomName} />
                </Container>
            </Frame>

            <Frame backgroundColor="transparent">
                <Container flex="end">
                    <Page
                        top={-10}
                        left={-30}
                        right={-30}
                        bottom={50}
                        padding={30}
                        momentum
                        gap={31}
                        dragEnabled={!voted}
                        // defaultEffect="pile"
                        onChangePage={index => setBet(scrumPoints[index])}
                    >
                        {scrumPoints.map((amount, index) => (
                            <Frame
                                key={`balot-id-${index}`}
                                // animate={{
                                //     translateX: [`-${index}00%`, '0%'],
                                //     transition: {
                                //         delay: 1,
                                //     },
                                // }}
                                backgroundColor="transparent"
                            >
                                <Card points={amount} />
                            </Frame>
                        ))}
                    </Page>

                    <Form onSubmit={submitHandler}>
                        <Button disabled={voted}>Vote!</Button>
                    </Form>
                </Container>
            </Frame>
        </Page>
    );
}
