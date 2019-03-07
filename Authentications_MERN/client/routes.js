import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IndexRoute } from 'react-router';
import App from './src/components/App';
import Greetings from './src/components/Greetings';
import SingupPage from './src/components/singup/SingupPage';

export const Routes = () => (
    <Router>
        <Route path='/' component={App} >
        <IndexRoute path="/" component={Greetings} />
        
        </Route>
        {/* <Route exact path='/signup' component={SingupPage} /> */}
    </Router>
    
)