import React, { Component } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addFlashMessage } from '../../actions//flashMessages';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';


class SignupPage extends Component {
    render() {
        const { userSignupRequest, addFlashMessage, isUserExists} = this.props;
        return(
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userSignupRequest={userSignupRequest} isUserExists={isUserExists} addFlashMessage={addFlashMessage} />
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userSignupRequest: propTypes.func.isRequired,
    addFlashMessage: propTypes.func.isRequired,
    isUserExists: propTypes.func.isRequired
  }

export default connect(null, { userSignupRequest, isUserExists, addFlashMessage })(SignupPage);