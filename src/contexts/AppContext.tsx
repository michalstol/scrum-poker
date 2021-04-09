import { readCookie } from './../helpers/cookie';
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
    reset: false,
    ...readCookie(['authenticated']),
};

// ResetInterface
export interface ResetInterface {
    reset: boolean | 'both';
}

export const defaultReset = {
    reset: false,
};

// UserInterface
export interface UserInterface {
    userName: string;
}

export const defaultUser = {
    userName: '',
    ...readCookie(['userName']),
};

// RoomInterface
export interface RoomIDInterface {
    roomID: undefined | string;
}

export const defaultRoom = {
    roomID: undefined,
    ...readCookie(['roomID']),
    ...getURLParam('roomID'),
};

export const defaultRole = {
    role: undefined,
    ...readCookie(['role']),
};

// UpdateContext
export interface UpdateContextInterface {
    updateContext(newStatus: object, updateCookie?: boolean): any;
}

export const defaultUpdateContext = {
    updateContext: function () {},
};

// ContextInterface
export interface ContextInterface
    extends AuthInterface,
        ResetInterface,
        UserInterface,
        RoomIDInterface,
        RoleInterface {}

export const defaultInterface = {
    ...defaultAuth,
    ...defaultReset,
    ...defaultRoom,
    ...defaultRole,
};
