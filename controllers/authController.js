const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../db/models/user');
const catchAsync = require('../utils/errorHandle');
const ApiError = require('../errors/ApiError');
const { sendApiSuccess } = require('../utils/sendApiResponse');
const userService = require('../services/userService');
const user = require('../db/models/user');
const { generateToken } = require('../middlewares/jwt');
const config = require('../config/config');
const sendEmail = require('../utils/emailService');

exports.register = catchAsync(async (req, res) => {
    let body = req.body;
    console.log(body);
    let findUser = await userService.findOneByField({ email: body?.email });
    if (findUser) {
        throw new ApiError(
            'Email already exists. Please login to proceed.',
            409,
        );
    }
    const newUser = await userService.createUser(body);
    if (newUser) {
        const result = newUser.toJSON();
        delete result.password;
        sendApiSuccess(
            res,
            result,
            'Registration successfulll. A verification email has been sent to your registered email.',
            201,
        );
    } else {
        throw new ApiError('Failed to register user.');
    }
});

exports.login = catchAsync(async (req, res) => {
    let body = req.body;
    let user = await userService.findOneByField({ email: body?.email });
    if (!user) {
        throw new ApiError('Invalid email or password.', 401);
    }
    let isPasswordMatch = await user.comparePassword(body?.password);
    if (isPasswordMatch) {
        const token = await generateToken({
            id: user?.id,
            email: user?.email,
            role: user?.role,
        });
        const response = { user, token };
        sendApiSuccess(res, response, 'Login Successful.', 200);
    } else {
        throw new ApiError('Invalid email or password.', 401);
    }
});

exports.forgotPassword = catchAsync(async (req, res) => {
    let { email } = req.body;
    if (!email) {
        throw new ApiError(
            'Please provide email to send reset password link.',
            422,
        );
    }
    let user = await userService.findOneByField({ email: email });
    if (user) {
        let token = crypto
            .randomBytes(60)
            .toString('base64')
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, 60);
        await user.update({
            resetPasswordToken: token,
        });
        const resetPasswordUrl = `${config.serverConfig.frontendUrl}/reset-password?token=${token}`;
        let data = {
            userName: user?.name,
            resetPasswordUrl: resetPasswordUrl,
        };
        sendEmail(
            user?.email,
            'Forgot Your Password',
            data,
            'forgot-password.ejs',
        );
    }
    user = user.toJSON() || {};
    sendApiSuccess(
        res,
        user,
        'If an account with this email exists, a password reset link has been sent.',
    );
});
exports.resetPassword = catchAsync(async (req, res) => {
    let { token, password } = req.body;

    let user = await userService.findOneByField({ resetPasswordToken: token });
    if (!user) {
        throw new ApiError(
            'The password reset token is invalid or has expired. Please request a new password reset.',
            400,
        );
    }
    await user.update({
        password: password,
        resetPasswordToken: null,
    });
    user = user.toJSON();
    sendApiSuccess(
        res,
        user,
        'Your password has been successfully reset. You can now log in with your new password.',
        200,
    );
});

exports.changePassword = catchAsync(async (req, res) => {
    let authUser = req.user;
    let body = req.body;
    let user = await userService.findById(authUser?.id);
    if (!user) {
        throw new ApiError(
            'Something went wrong. Please try again later.',
            502,
        );
    }
    const isMatch = await user.comparePassword(body?.oldPassword);
    if (!isMatch) {
        throw new ApiError('Incorrect old password.', 400);
    }
    await user.update({
        password: body?.password,
    });
    user = user.toJSON();
    sendApiSuccess(res, user, 'Password changed successfully.');
});
