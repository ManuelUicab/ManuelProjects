const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function SignupValidation (data) {
    let errors = {};


    // Email checks
    if(validator.isEmpty(data.username)){
        errors.username = "This field is required";
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "This field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (validator.isEmpty(data.password)) {
        errors.password = "This field is required";
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "This field is required";
    }else if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}