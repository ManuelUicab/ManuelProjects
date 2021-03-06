import React from 'react';
import propTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/validation/login';
import { connect } from 'react-redux';
import { login } from '../../actions/login';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state)
                .then(
                    (res) => this.context.router.history.push('/'),
                    (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                );
        }
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { errors, email, password, isLoading } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>

                {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: propTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: propTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);