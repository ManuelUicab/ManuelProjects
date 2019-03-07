import React, { Component } from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';

class NavigationBar extends Component {
    logout(e) {
        e.preventDefault();
        //llama a la acción logout
        this.props.logout();
    }

    render() {

        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a className="navbar-brand" href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );
        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link className="navbar-brand" to="/signup">Sing Up</Link></li>
                <li><Link className="navbar-brand" to="/login">Login</Link></li>
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Red Dice</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        {isAuthenticated ? userLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: propTypes.object.isRequired,
    logout: propTypes.func.isRequired
}
//el state lo retorna el reductor auth
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavigationBar);