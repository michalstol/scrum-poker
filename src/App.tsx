import React, { useState } from 'react';

import { setCookie } from './helpers/cookie';

import { defaultInterface } from './contexts/AppContext';

import Auth from './base/Auth';
import SignInForm from './components/SignInForm';
import SetRoom from './components/SetRoom';
import SelectRole from './components/SelectRole';

function App() {
    const [appState, setAppState] = useState({
        ...defaultInterface,
    });

    const updateContext = (newState: any, updateCookie?: boolean): any => {
        setAppState({ ...appState, ...newState });

        updateCookie && setCookie({ ...newState });
    };

    const { authenticated, connected, roomID, role } = appState;

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>authenticated</th>
                            <th>connected</th>
                            <th>roomID</th>
                            <th>role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{authenticated ? 'true' : 'false'}</td>
                            <td>{connected ? 'true' : 'false'}</td>
                            <td>{!!roomID ? roomID : 'null'}</td>
                            <td>{!!role ? role : 'null'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <Auth updateContext={updateContext} />
            <SignInForm />
            <SetRoom updateContext={updateContext} />

            {authenticated && connected && roomID && (
                <SelectRole updateContext={updateContext} roomID={roomID} />
            )}
        </>
    );
}

export default App;
