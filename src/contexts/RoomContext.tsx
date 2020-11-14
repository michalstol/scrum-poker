import { RoomIDInterface } from './AppContext';

// Room Interface
export interface RoomInterface {
    name: string;
    admin: string;
}

export const defaultRoom = {
    name: 'Scrum Poker',
    admin: '',
};

// Room Component Interface
export interface RoomComponentInterface extends RoomIDInterface {
    roomName: string;
}

// Roles Interface

export const roles = ['spectator', 'croupier', 'player'];

export interface RoleInterface {
    role: null | 'croupier' | 'spectator' | 'player';
}

// User Interface

export interface UserInterface {
    uid: string;
    name: string;
    bet: undefined | number;
    voted: boolean;
    clone(role: RoleInterface): RoleInterface;
}

export const defaultRoomUser = {
    uid: '',
    name: '',
    role: roles[0],
    bet: 0,
    voted: false,
};
