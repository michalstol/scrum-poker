import { checkCookie } from './../helpers/cookie';
import { getURLParam } from './../helpers/url-param';

import { RoleInterface } from './RoomContext';

// AuthInterface
export interface AuthInterface {
    authenticated: boolean;
    connected: boolean;
    userName: string;
}

export const defaultAuth = {
    authenticated: false,
    connected: false,
    userName: '',
    ...checkCookie(['authenticated', 'userName']),
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
};

// UpdateContext
export interface UpdateContextInterface {
    updateContext(newStatus: object, updateCookie?: boolean): any;
}

export const defaultUpdateContext = {
    updateContext: function ({}) {},
};

// ContextInterface
export interface ContextInterface
    extends AuthInterface,
        RoomIDInterface,
        RoleInterface {}

export const defaultInterface = {
    ...defaultAuth,
    ...defaultRoom,
    ...defaultRole,
};
