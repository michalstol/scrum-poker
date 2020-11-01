import React, { useState } from 'react';
// import { FirebaseAuth } from '@firebase/auth-types';

import { auth, db } from './../firebase/firebase';

import { UpdateContextInterface } from './../contexts/AppContext';
import { defaultRoom } from './../contexts/RoomContext';

import Container from './Container';
import Form from './form-components/Form';
import Input from './form-components/Input';
import Button from './form-components/Button';

export default function SetRoom({
    updateContext,
}: UpdateContextInterface): any {
    const dbRooms = db.collection('rooms');
    const [roomID, setRoomID] = useState('');
    const [roomName, setRoomName] = useState('');

    const joinRoomHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        dbRooms
            .doc(roomID)
            .get()
            .then(doc => {
                if (!doc.exists) return;

                updateContext(
                    {
                        roomID,
                    },
                    true
                );
            })
            .catch(error => console.log(error));
    };

    const createRoomHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        // typescript FirebaseAuth from @firebase/auth-types
        const { uid }: any = auth.currentUser;

        dbRooms
            .add({
                ...defaultRoom,
                name: roomName,
                admin: uid,
                users: [],
            })
            .then(doc => {
                const { id } = doc;

                updateContext(
                    {
                        roomID: id,
                    },
                    true
                );
            });
    };

    return (
        <Container flex="end">
            <Form onSubmit={joinRoomHandler}>
                <Input
                    type="text"
                    name="room-id"
                    placeholder="Put a room ID"
                    minLength={28}
                    maxLength={28}
                    required={true}
                    value={roomID}
                    setValue={setRoomID}
                />

                <Button variation="button--distance-small">Join!</Button>
            </Form>
            <Form onSubmit={createRoomHandler}>
                <Input
                    type="text"
                    name="room-name"
                    placeholder="Set a room name"
                    required={true}
                    value={roomName}
                    setValue={setRoomName}
                />

                <Button variation="button--distance-small">
                    Create a room!
                </Button>
            </Form>
        </Container>
    );
}
