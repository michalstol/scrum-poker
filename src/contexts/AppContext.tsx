import React from 'react';

// AuthInterface
export interface AuthInterface {
    authenticated: boolean;
    connected: boolean;
}

export const defaultAuth = {
    authenticated: false,
    connected: false,
};

// UpdateContext
export interface UpdateContext {
    updateContext(): any;
}

export const defaultUpdateContext = {
    updateContext: function () {},
};

// ContextInterface
export interface ContextInterface {
    clone(authenticated: AuthInterface): AuthInterface;
    clone(connected: AuthInterface): AuthInterface;
    clone(updateContext: UpdateContext): UpdateContext;
}

export const defaultInterface = {
    ...defaultAuth,
    ...defaultUpdateContext,
};

const AppContext = React.createContext({ ...defaultInterface });

export default AppContext;
