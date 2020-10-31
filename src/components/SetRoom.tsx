import React, { useState } from 'react';
// import { FirebaseAuth } from '@firebase/auth-types';

import { auth, db } from './../firebase/firebase';

import { UpdateContextInterface } from './../contexts/AppContext';
import { defaultRoom } from './../contexts/RoomContext';

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
        <>
            <Form onSubmit={joinRoomHandler}>
                <Input
                    type="text"
                    name="room-id"
                    placeholder="Put a room ID"
                    value={roomID}
                    setValue={setRoomID}
                />

                <Button>Join!</Button>
            </Form>
            <Form onSubmit={createRoomHandler}>
                <Input
                    type="text"
                    name="room-name"
                    placeholder="Put a room name"
                    value={roomName}
                    setValue={setRoomName}
                />

                <Button>Create a room!</Button>
            </Form>
        </>
    );
}
