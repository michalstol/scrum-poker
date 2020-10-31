import React from 'react';

import { RoomIDInterface } from './../contexts/AppContext';

import RoomTable from './room-components/RoomTable';
import RoomBallot from './room-components/RoomBallot';
import RoomReset from './room-components/RoomReset';

export default function Room({ roomID }: RoomIDInterface) {
    return (
        <>
            <RoomTable roomID={roomID} />
            <RoomBallot roomID={roomID} />
            <RoomReset roomID={roomID} />
        </>
    );
}
