import React from 'react';
// import { BrowserRouter as HashRouter, Route, Switch, Link } from 'react-router-dom';
import {Provider} from 'react-redux';

// store import
import store from './store';

// import components
import Auth from './components/auth/Auth';
import RouterPanel from './components/router-panel/RouterPanel';

// import scss
import './scss/main.scss';

function App() {
  return (
    <Provider store={store}>
      {/* <HashRouter basename="#"> */}

        <Auth />
        <RouterPanel />
        
      {/* </HashRouter> */}
    </Provider>
  );
}

export default App;
