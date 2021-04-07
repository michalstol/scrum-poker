import React, { useState, useEffect } from 'react';

import { saveCookie } from './helpers/cookie';
import router from './helpers/router';

import { defaultInterface } from './contexts/AppContext';

import DebugViews from './components/DebugView';
import Auth from './base/Auth';
import PageWrapper from './components/PageWrapper';
import Intro from './components/Intro';
import Settings from './components/Settings';
import SignInForm from './components/SignInForm';
import FirstVisit from './components/FirstVisit';
import SetRoom from './components/SetRoom';
import SelectRole from './components/SelectRole';
import Room from './components/Room';

import './styles/app.scss';

function App() {
    const [appState, setAppState] = useState({
        ...defaultInterface,
    });
    const [page, setPage] = useState(router(appState));

    const updateContext = (newState: any, updateCookie?: boolean): any => {
        setAppState({ ...appState, ...newState });

        updateCookie && saveCookie({ ...newState });
    };

    useEffect(() => {
        setPage(router(appState));
    }, [appState]);

    const { roomID, role } = appState;

    return (
        <>
            {false && <DebugViews {...appState} />}

            <Auth updateContext={updateContext} />

            <PageWrapper
                render={page === 'connecting'}
                opacity={1}
                delay={0.5}
                zIndex={9999}
            >
                <Intro />
            </PageWrapper>

            <PageWrapper render={page === 'sign-in'}>
                <SignInForm />
            </PageWrapper>

            <PageWrapper render={page === 'reset-user'}>
                <FirstVisit updateContext={updateContext} />
            </PageWrapper>

            <PageWrapper render={page === 'select-room'}>
                <SetRoom updateContext={updateContext} />
            </PageWrapper>

            <PageWrapper render={page === 'select-role'}>
                <SelectRole updateContext={updateContext} roomID={roomID} />
            </PageWrapper>

            <PageWrapper render={page === 'room'}>
                <Settings roomID={roomID} />
                <Room roomID={roomID} role={role} />
            </PageWrapper>
        </>
    );
}

export default App;
