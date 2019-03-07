import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { Provider } from 'react-redux';
import store from './components/store';
import { setCurrentUser,logout } from './actions/login';
import jwtDecode from 'jwt-decode';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthorizationToken(token);
    const decoded = jwtDecode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    console.log(currentTime);
    console.log(decoded.exp);
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logout());

        // Redirect to login
        window.location.href = "./login";
    }
}


render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
