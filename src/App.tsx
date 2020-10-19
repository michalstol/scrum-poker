import React from 'react';

import { checkCookie } from './helpers/cookie';
import AppContext, { defaultInterface } from './contexts/AppContext';

function App() {
    return (
        <AppContext.Provider value={{ ...defaultInterface, ...checkCookie() }}>
            <>App</>
        </AppContext.Provider>
    );
}

export default App;
