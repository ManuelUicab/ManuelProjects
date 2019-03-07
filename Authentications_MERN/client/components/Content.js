import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Loginpage from './login/LoginPage';
import EventsPage from './events/EventsPage';
import requireAuth from './../utils/requireAuth';
import NotFound from './App/NotFound';
import Greetings from './Greetings';
import SignupPage from './singup/SingupPage';

class Content extends Component {

    render() {
        const styles = {
            marginLeft: this.props.marginLeft
        };
        return (
            
            <main className="app-content" style={styles} >
                <Switch>
                    <Route exact path="/" component={Greetings} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/login" component={Loginpage} />
                    <Route exact path="/event" component={requireAuth(EventsPage)} />
                    <Route component={NotFound} />
                </Switch>
            </main>

        );
    }
}

export default Content;