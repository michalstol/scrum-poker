import React, { useState } from 'react';

import { setCookie } from './helpers/cookie';

import { defaultInterface } from './contexts/AppContext';

import DebugViews from './components/DebugView';
import Auth from './base/Auth';
import Intro from './components/Intro';
import SignInForm from './components/SignInForm';
import SetNameAndPassword from './components/SetNameAndPassword';
import SetRoom from './components/SetRoom';
import SelectRole from './components/SelectRole';
import Room from './components/Room';

import './styles/app.scss';

function App() {
    const [page, setPage] = useState(0);
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
            {false && <DebugViews {...appState} />}

            <Auth updateContext={updateContext} />
            {/* <Intro connected={connected} /> */}
            {/* <SignInForm /> */}
            {!authenticated && connected && <SignInForm />}
            {authenticated && connected && roomID && role && (
                <Room roomID={roomID} role={role} />
            )}
            {/* <SetNameAndPassword updateContext={updateContext} /> */}
            {/* {!roomID && <SetRoom updateContext={updateContext} />} */}
            {/* {authenticated && connected && roomID && (
                <SelectRole updateContext={updateContext} roomID={roomID} />
            )} */}

            {/* <Page
                width={'100%'}
                height={'100%'}
                // dragEnabled={false}
                // currentPage={page}
            >
                <Frame>
                    <SignInForm />
                </Frame>
                <Frame>
                    <SetName updateContext={updateContext} />
                </Frame>
                <Frame>
                    <SetRoom updateContext={updateContext} />
                </Frame>
                <SelectRole updateContext={updateContext} roomID={roomID} />
                <Room roomID={roomID} role={role} />
            </Page> */}
            {/* {!authenticated && connected && <SignInForm />}
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
                    {roomID && role && <Room roomID={roomID} role={role} />}
                </>
            )} */}
        </>
    );
}

export default App;
