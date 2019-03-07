import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists }) => {
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label className="control-label">{label}</label>
            <input className="form-control" type={type} name={field} value={value} onChange={onChange} onBlur={checkUserExists} />
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}

TextFieldGroup.propTypes = {
    field: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    error: propTypes.string,
    onChange: propTypes.func.isRequired,
    checkUserExists: propTypes.func
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;