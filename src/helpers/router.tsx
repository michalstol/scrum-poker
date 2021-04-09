import { ContextInterface } from './../contexts/AppContext';

interface RoutesArray {
    url: string;
    test: ContextInterface;
}

export const routesArray: RoutesArray[] = [
    {
        url: 'connecting',
        test: {
            authenticated: false,
            connected: false,
            reset: 'both',
            roomID: undefined,
            role: null,
            userName: '',
        },
    },
    {
        url: 'sign-in',
        test: {
            authenticated: false,
            connected: true,
            reset: 'both',
            roomID: undefined,
            role: null,
            userName: '',
        },
    },
    {
        url: 'reset-user',
        test: {
            authenticated: true,
            connected: true,
            reset: false,
            roomID: undefined,
            role: null,
            userName: '',
        },
    },
    {
        url: 'select-room',
        test: {
            authenticated: true,
            connected: true,
            reset: false,
            roomID: undefined,
            role: null,
            userName: 'Foo',
        },
    },
    {
        url: 'select-role',
        test: {
            authenticated: true,
            connected: true,
            reset: false,
            roomID: 'foo-room-id',
            role: null,
            userName: 'Foo',
        },
    },
    {
        url: 'room',
        test: {
            authenticated: true,
            connected: true,
            reset: false,
            roomID: 'foo-room-id',
            role: 'croupier',
            userName: 'Foo',
        },
    },
];

export default function router({
    authenticated,
    connected,
    reset,
    roomID,
    role,
    userName,
}: ContextInterface) {
    if (!connected || !!reset) return routesArray[0].url;
    if (!authenticated && connected) return routesArray[1].url;

    if (authenticated && connected && !reset) {
        if (!userName) return routesArray[2].url;
        if (!roomID) return routesArray[3].url;
        if (!role) return routesArray[4].url;

        return routesArray[5].url;
    }

    console.warn('Router -- problem with select page');
}
