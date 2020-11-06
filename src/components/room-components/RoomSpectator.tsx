import React from 'react';

import { RoomIDInterface } from './../../contexts/AppContext';

import Container from './../Container';
import Header from './../Header';
import RoomTable from './RoomTable';

export default function RoomSpectator({ roomID }: RoomIDInterface) {
    return (
        <Container>
            <RoomTable roomID={roomID} />
        </Container>
    );
}
