const Joi = require('joi');
const userRegistrationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().optional().allow(''),
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
        'any.required': 'Missing required information to proceed your request.',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Please provide a password to reset your password',
    }),
});
const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    password: Joi.string().required(),
});

const productSchema = Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.number().required(),
    description: Joi.string().optional().allow(''),
    price: Joi.number().required(),

});
module.exports = {
    userRegistrationSchema,
    loginSchema,
    resetPasswordSchema,
    changePasswordSchema,
    productSchema
};
