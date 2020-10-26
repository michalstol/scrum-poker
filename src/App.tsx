import React, { useState } from 'react';

import AppContext, { defaultInterface } from './contexts/AppContext';

import Auth from './base/Auth';
import SignInForm from './components/SignInForm';
import SetRoom from './components/SetRoom';

function App() {
    const [appState, setAppState] = useState({
        ...defaultInterface,
        updateContext: (newState: any) =>
            setAppState({ ...appState, ...newState }),
    });
    const { authenticated, connected, roomID, updateContext } = appState;

    return (
        <AppContext.Provider value={appState}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>authenticated</th>
                            <th>connected</th>
                            <th>roomID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{authenticated ? 'true' : 'false'}</td>
                            <td>{connected ? 'true' : 'false'}</td>
                            <td>{roomID !== null ? roomID : 'null'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <Auth updateContext={updateContext} />
            <SignInForm />
            <SetRoom updateContext={updateContext} />
        </AppContext.Provider>
    );
}

export default App;
