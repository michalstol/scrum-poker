import React, { useState, useEffect } from 'react';

import { auth } from './../firebase/firebase';
import { setCookie } from './../helpers/cookie';

import { UpdateContextInterface, defaultAuth } from './../contexts/AppContext';

export default function Auth({ updateContext }: UpdateContextInterface): any {
    const [authState, setAuthState] = useState({ ...defaultAuth });
    const [userData, setUserData] = useState({ uid: 'false' });

    useEffect(() => {
        setCookie({
            authenticated: authState.authenticated,
            userName: authState.userName,
        });

        updateContext({
            ...authState,
        });
    }, [authState.authenticated, authState.connected]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUserData(!!user ? user : { uid: 'false' });
            setAuthState({
                ...authState,
                connected: true,
                authenticated: !!user,
                userName: user?.displayName || '',
            });
        });
    }, [userData.uid]);

    return <></>;
}
