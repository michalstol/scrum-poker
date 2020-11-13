import React from 'react';

import { RoomIDInterface } from './../contexts/AppContext';
import { RoleInterface } from './../contexts/RoomContext';

import RoomSpectator from './room-components/RoomSpectator';
import RoomPlayer from './room-components/RoomPlayer';
import RoomCroupier from './room-components/RoomCroupier';

interface RoomInterface extends RoomIDInterface, RoleInterface {}

export default function Room({ roomID, role }: RoomInterface) {
    return (
        <>
            {role === 'spectator' && <RoomSpectator roomID={roomID} />}
            {role === 'player' && <RoomPlayer roomID={roomID} />}
            {role === 'croupier' && <RoomCroupier roomID={roomID} />}
        </>
    );
}
