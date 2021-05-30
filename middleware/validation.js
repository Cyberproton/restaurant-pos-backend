const Joi = require('joi');
const { Schema } = require('mongoose');

// Register Validation for User Account
const userRegisterValidation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(225)
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        repassword: Joi.string()
            .min(6)
            .max(1024)
            .required()
            .valid(Joi.ref('password')),
        fullname: Joi.string()
            .default('Customer')
            .min(6)
            .max(255),
        phonenumber: Joi.string()
            .min(6)
            .max(12),
        dateofbirth: Joi.string()
            .min(8)
            .max(11),
    });
    return schema.validate(data, Schema);
}

// Register Validation for Employee Account
const employeeRegisterValidation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(225)
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        repassword: Joi.string()
            .min(6)
            .max(1024)
            .required()
            .valid(Joi.ref('password')),
        fullname: Joi.string()
            .default('Customer')
            .min(6)
            .max(255),
        phonenumber: Joi.string()
            .min(6)
            .max(12),
        work: Joi.string(),
        dateofbirth: Joi.string()
            .min(8)
            .max(11),
        mailaddress: Joi.string()
            .email()
            .required(),
        salary: Joi.number()
            .required(),
    });
    return schema.validate(data, Schema);
}

// Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(6)
            .max(225)
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
    });
    return schema.validate(data, Schema);
}

module.exports.employeeRegisterValidation = employeeRegisterValidation;
module.exports.userRegisterValidation = userRegisterValidation;
module.exports.loginValidation = loginValidation;