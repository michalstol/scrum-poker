import React from 'react';

import { RoomIDInterface } from './../contexts/AppContext';
import { RoleInterface } from './../contexts/RoomContext';

import RoomTable from './room-components/RoomTable';
import RoomBallot from './room-components/RoomBallot';
import RoomReset from './room-components/RoomReset';

interface RoomInterface extends RoomIDInterface, RoleInterface {}

export default function Room({ roomID, role }: RoomInterface) {
    return (
        <>
            {/* <RoomTable roomID={roomID} /> */}

            {role === 'player' && <RoomBallot roomID={roomID} />}
            {role === 'croupier' && <RoomReset roomID={roomID} />}
        </>
    );
}
