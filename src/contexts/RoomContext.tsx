import React from 'react';
import firebase from 'firebase';

export interface RoomInterface {
    name: string;
    admin: string;
    users: [];
}

export const defaultRoom = {
    name: 'Scrum Poker',
    admin: '',
    users: [],
};

export interface UserInterface {
    uid: string;
    name: string;
    role: 'croupier' | 'spectator' | 'player';
    bet: null | number;
}

export const defaultRoomUser = {
    uid: '',
    name: '',
    role: 'spectator',
    bet: null,
};
