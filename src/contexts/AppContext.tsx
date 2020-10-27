import { checkCookie } from './../helpers/cookie';
import { getURLParam } from './../helpers/url-param';

import { RoleInterface } from './RoomContext';

// AuthInterface
export interface AuthInterface {
    authenticated: boolean;
    connected: boolean;
}

export const defaultAuth = {
    authenticated: false,
    connected: false,
    ...checkCookie(['authenticated']),
};

// RoomInterface
export interface RoomIDInterface {
    roomID: undefined | string;
}

export const defaultRoom = {
    roomID: undefined,
    ...checkCookie(['roomID']),
    ...getURLParam('roomID'),
};

export const defaultRole = {
    role: undefined,
    ...checkCookie(['role']),
    ...getURLParam('role'),
};

// UpdateContext
export interface UpdateContextInterface {
    updateContext(newStatus: object, updateCookie?: boolean): any;
}

export const defaultUpdateContext = {
    updateContext: function ({}) {},
};

// ContextInterface
export interface ContextInterface {
    clone(authenticated: AuthInterface): AuthInterface;
    clone(connected: AuthInterface): AuthInterface;
    clone(roomID: RoomIDInterface): RoomIDInterface;
    clone(role: RoleInterface): RoleInterface;
}

export const defaultInterface = {
    ...defaultAuth,
    ...defaultRoom,
    ...defaultRole,
};
