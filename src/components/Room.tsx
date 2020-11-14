import React from 'react';

import { RoomIDInterface } from './../contexts/AppContext';
import { RoleInterface } from './../contexts/RoomContext';

import useRoomName from './../hooks/useRoomName';

import RoomSpectator from './room-components/RoomSpectator';
import RoomPlayer from './room-components/RoomPlayer';
import RoomCroupier from './room-components/RoomCroupier';

interface RoomInterface extends RoomIDInterface, RoleInterface {}

export default function Room({ roomID, role }: RoomInterface) {
    const roomName: string = useRoomName(roomID);

    return (
        <>
            {role === 'spectator' && (
                <RoomSpectator roomID={roomID} roomName={roomName} />
            )}
            {role === 'player' && (
                <RoomPlayer roomID={roomID} roomName={roomName} />
            )}
            {role === 'croupier' && (
                <RoomCroupier roomID={roomID} roomName={roomName} />
            )}
        </>
    );
}
