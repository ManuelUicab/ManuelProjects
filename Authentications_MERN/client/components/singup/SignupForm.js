import React, { Component } from 'react';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SignupValidation from '../../../server/validation/Signup';

class SignupForm extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);

    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    isValid() {
        const { errors, isValid } = SignupValidation(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state)
                .then(
                    () => {
                        this.props.addFlashMessage({
                            type: 'success',
                            text: 'You signed up seccessfully. Welcome!'
                        });
                        this.context.router.history.push('/');
                    },
                    ({ response }) => {

                        this.setState({ errors: response.data, isLoading: false });
                    }
                );
        }

    }

    checkUserExists(e) {
        const { name, value } = e.target;
        if (value != '') {
            this.props.isUserExists(value)
                .then(res => {
                    let errors = this.state.errors;
                    let invalid;
                    if (res.data.user) {
                        errors[name] = 'There is user with such ' + name;
                        invalid = true;
                    } else {
                        errors[name] = '';
                        invalid = false;
                    }
                    this.setState({ errors, invalid });
                });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Register</h1>
                <TextFieldGroup error={errors.username} label="Username" onChange={this.onChange} value={this.state.username} field="username" />
                <TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} value={this.state.email} checkUserExists={this.checkUserExists} field="email" />
                <TextFieldGroup error={errors.password} label="Password" onChange={this.onChange} value={this.state.password} field="password" type="password" />
                <TextFieldGroup error={errors.password2} label="Confirm password" onChange={this.onChange} value={this.state.password2} field="password2" type="password" />
                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>

            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: propTypes.func.isRequired,
    addFlashMessage: propTypes.func.isRequired,
    isUserExists: propTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: propTypes.object.isRequired
}

export default SignupForm;