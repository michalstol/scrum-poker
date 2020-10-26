import React from 'react';

import { checkCookie } from './../helpers/cookie';

// AuthInterface
export interface AuthInterface {
    authenticated: boolean;
    connected: boolean;
}

export const defaultAuth = {
    authenticated: false,
    connected: false,
    ...checkCookie(undefined, ['authenticated']),
};

// RoomInterface
export interface RoomIDInterface {
    roomID: null | string;
}

export const defaultRoom = {
    roomID: null,
    ...checkCookie(undefined, ['roomID']),
};

// UpdateContext
export interface UpdateContextInterface {
    updateContext(newStatus: object): any;
}

export const defaultUpdateContext = {
    updateContext: function ({}) {},
};

// ContextInterface
export interface ContextInterface {
    clone(authenticated: AuthInterface): AuthInterface;
    clone(connected: AuthInterface): AuthInterface;
    clone(roomID: RoomIDInterface): RoomIDInterface;
    clone(updateContext: UpdateContextInterface): UpdateContextInterface;
}

export const defaultInterface = {
    ...defaultAuth,
    ...defaultRoom,
    ...defaultUpdateContext,
};

const AppContext = React.createContext({ ...defaultInterface });

export default AppContext;
