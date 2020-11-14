import { ContextInterface } from './../contexts/AppContext';

export default function router({
    authenticated,
    connected,
    roomID,
    role,
    userName,
}: ContextInterface) {
    if (!connected) return 'connecting';
    if (!authenticated && connected) return 'sign-in';

    if (authenticated && connected) {
        if (!userName) return 'reset-user';
        if (!roomID) return 'select-room';
        if (!role) return 'select-role';

        return 'room';
    }

    console.warn('Router -- problem with select page');
}
