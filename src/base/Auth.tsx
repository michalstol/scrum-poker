import React, { useState, useEffect } from 'react';

import { auth } from './../firebase/firebase';
import { saveCookie } from './../helpers/cookie';

import { UpdateContextInterface, defaultAuth } from './../contexts/AppContext';

export default function Auth({ updateContext }: UpdateContextInterface): null {
    const [authState, setAuthState] = useState({ ...defaultAuth });
    const [userData, setUserData] = useState({ uid: 'false' });

    useEffect(() => {
        saveCookie({
            authenticated: authState.authenticated,
            userName: authState.userName,
        });

        updateContext({
            ...authState,
        });
    }, [authState.authenticated, authState.userName]);

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

    return null;
}
