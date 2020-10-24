import React, { useState } from 'react';

import AppContext, { defaultInterface } from './contexts/AppContext';

import Auth from './base/Auth';
import SignInForm from './components/SignInForm';

function App() {
    const [appState, setAppState] = useState({
        ...defaultInterface,
        updateContext: (newState: any) =>
            setAppState({ ...appState, ...newState }),
    });
    const { authenticated, connected } = appState;

    return (
        <AppContext.Provider value={appState}>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>authenticated</th>
                            <th>connected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{authenticated ? 'true' : 'false'}</td>
                            <td>{connected ? 'true' : 'false'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <Auth updateContext={appState.updateContext} />
            <SignInForm />
        </AppContext.Provider>
    );
}

export default App;
