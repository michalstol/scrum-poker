import React from 'react';

import { RoomComponentInterface } from './../../contexts/RoomContext';

import Container from './../Container';
import RoomTable from './RoomTable';

export default function RoomSpectator({
    roomID,
    roomName,
}: RoomComponentInterface) {
    return (
        <Container>
            <RoomTable roomID={roomID} roomName={roomName} />
        </Container>
    );
}
