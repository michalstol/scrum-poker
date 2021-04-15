import React, { useState, useEffect } from 'react';

import { saveCookie } from './helpers/cookie';
import router from './helpers/router';

import { defaultInterface } from './contexts/AppContext';

import DebugViews from './components/DebugView';
import Auth from './base/Auth';
import Intro from './components/Intro';
import Settings from './components/Settings';
import SignInForm from './components/SignInForm';
import FirstVisit from './components/FirstVisit';
import SelectRoom from './components/SelectRoom';
import SelectRole from './components/SelectRole';
import Room from './components/Room';

import { redirect } from './router';
import Router from './router/Router';
import Route from './router/Route';

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

    const updateRouter = () => {
        const newLocation = router(appState);

        if (newLocation === page) return;

        redirect(newLocation);
        setPage(newLocation);
    };

    useEffect(() => {
        redirect('/');
    }, []);

    useEffect(() => {
        updateRouter();
    }, [appState]);

    const { reset, roomID, role } = appState;

    return (
        <>
            {false && <DebugViews {...appState} />}

            <Auth updateContext={updateContext} />

            <Router>
                <Route path="/">
                    <Intro />
                </Route>

                <Route path="/sign-in">
                    <SignInForm
                        reset={reset}
                        clearReset={() => updateContext({ reset: false })}
                    />
                </Route>

                <Route path="/welcome">
                    <FirstVisit updateContext={updateContext} />
                </Route>

                <Route path="/select-room">
                    <SelectRoom updateContext={updateContext} />
                </Route>

                <Route path="/select-role">
                    <SelectRole updateContext={updateContext} roomID={roomID} />
                </Route>

                <Route path="/room">
                    <Settings roomID={roomID} />
                    <Room roomID={roomID} role={role} />
                </Route>
            </Router>
        </>
    );
}

export default App;
