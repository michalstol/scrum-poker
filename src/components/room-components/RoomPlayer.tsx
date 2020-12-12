import React, { useState, useEffect } from 'react';
import { Frame, Page } from 'framer';
import { firestore } from 'firebase';

import { auth, db } from '../../firebase/firebase';

import { RoomComponentInterface } from '../../contexts/RoomContext';

import { createTimeout } from '../../helpers/db-functions';

import RoomTable from './RoomTable';
import Container from './../Container';
import Cards from './Cards';
import BetNumber from './BetNumber';

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

    const [bet, setBet] = useState(-1);
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
            timestamp: createTimeout(),
        });
    }, [voted]);

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
                <Container flex="space-between">
                    <BetNumber bet={bet} />
                    <Cards setBet={setBet} setVoted={setVoted} />
                </Container>
            </Frame>
        </Page>
    );
}
