import React, { useState } from 'react';

import { setCookie } from './helpers/cookie';

import { defaultInterface } from './contexts/AppContext';

import Auth from './base/Auth';
import DebugViews from './components/DebugView';
import SignInForm from './components/SignInForm';
import SetName from './components/SetName';
import SetRoom from './components/SetRoom';
import SelectRole from './components/SelectRole';
import Room from './components/Room';

function App() {
    const [appState, setAppState] = useState({
        ...defaultInterface,
    });

    const updateContext = (newState: any, updateCookie?: boolean): any => {
        setAppState({ ...appState, ...newState });

        updateCookie && setCookie({ ...newState });
    };

    const { authenticated, connected, roomID, role, userName } = appState;

    return (
        <>
            <Auth updateContext={updateContext} />
            <DebugViews {...appState} />

            <hr />

            {!authenticated && connected && <SignInForm />}
            {authenticated && connected && (
                <>
                    {!userName && <SetName updateContext={updateContext} />}
                    {!roomID && <SetRoom updateContext={updateContext} />}
                    {roomID && !role && (
                        <SelectRole
                            updateContext={updateContext}
                            roomID={roomID}
                        />
                    )}
                    {roomID && role && <Room roomID={roomID} />}
                </>
            )}
        </>
    );
}

export default App;
