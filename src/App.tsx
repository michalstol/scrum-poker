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

    console.table(appState);

    return (
        <AppContext.Provider value={appState}>
            <Auth updateContext={appState.updateContext} />
            <SignInForm />
        </AppContext.Provider>
    );
}

export default App;
