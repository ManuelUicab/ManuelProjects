import React, { Component } from 'react';
import NavigationBar from '../Navigation/NavigationBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FlashMessageList from '../flash/FlashMessagesList';
import Header from '../Header/Header';
import Content from '../Content';
import Menu from '../Navigation/Menu';
import propTypes from 'prop-types';
import { connect } from 'react-redux';


class App extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;
        const marginLeft = isAuthenticated ? 230+'px' : 0+'px';
        return (
                <Router >
                    <div>
                        <Header />
                        {isAuthenticated && <Menu />}
                        <FlashMessageList />
                        <Content marginLeft={marginLeft} />

                    </div>
                </Router>
        );
        
    }
}
App.propTypes = {
    auth: propTypes.object.isRequired,
}

//el state lo retorna el reductor auth
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(App);
