import React, { useState, useEffect } from 'react';
// import { FirebaseAuth } from '@firebase/auth-types';

import { auth, db } from './../firebase/firebase';

import { UpdateContextInterface } from './../contexts/AppContext';
import { defaultRoom } from './../contexts/RoomContext';

import Input from './form-component/Input';
import Button from './form-component/Button';

const dbRooms = db.collection('rooms');

export default function SetRoom({
    updateContext,
}: UpdateContextInterface): any {
    const [roomID, setRoomID] = useState('');
    const [roomName, setRoomName] = useState('');
    const [newRoomID, setNewRoomID] = useState('');

    useEffect(() => {
        if (newRoomID === '') return;

        updateContext({
            roomID: newRoomID,
        });
    }, [newRoomID]);

    const joinRoomHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        console.log({ roomID });
    };

    const createRoomHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        // typescript FirebaseAuth from @firebase/auth-types
        const { uid, displayName }: any = auth.currentUser;

        dbRooms
            .add({
                ...defaultRoom,
                name: roomName,
                admin: uid,
                users: [],
            })
            .then(doc => {
                const { id } = doc;

                setNewRoomID(id);
            });
    };

    return (
        <>
            <form onSubmit={joinRoomHandler}>
                <Input
                    type="text"
                    name="room-id"
                    placeholder="Put a room ID"
                    value={roomID}
                    setValue={setRoomID}
                />

                <Button>Join!</Button>
            </form>
            <form onSubmit={createRoomHandler}>
                <Input
                    type="text"
                    name="room-name"
                    placeholder="Put a room name"
                    value={roomName}
                    setValue={setRoomName}
                />

                <Button>Create a room!</Button>
            </form>
        </>
    );
}
