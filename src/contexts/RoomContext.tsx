export interface RoomInterface {
    name: string;
    admin: string;
}

export const defaultRoom = {
    name: 'Scrum Poker',
    admin: '',
};

export const roles = ['spectator', 'croupier', 'player'];

export interface RoleInterface {
    role: null | 'croupier' | 'spectator' | 'player';
}

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
    bet: null,
    voted: false,
};