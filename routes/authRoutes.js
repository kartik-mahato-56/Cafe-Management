const { Router } = require('express');
const authRoutes = Router();
const authController = require('../controllers/authController');
const validateRequestSchema = require('../middlewares/validateRequest');
const validationSchema = require('../utils/validationSchema');
const { verifyJwtToken } = require('../middlewares/jwt');

authRoutes.post(
    '/register',
    validateRequestSchema(validationSchema.userRegistrationSchema),
    authController.register,
);

authRoutes.post(
    '/login',
    validateRequestSchema(validationSchema.loginSchema),
    authController.login,
);
authRoutes.post('/forgot-password', authController.forgotPassword);
authRoutes.post(
    '/reset-password',
    validateRequestSchema(validationSchema.resetPasswordSchema),
    authController.resetPassword,
);
authRoutes.patch(
    '/change-password',
    verifyJwtToken,
    validateRequestSchema(validationSchema.changePasswordSchema),
    authController.changePassword,
);
module.exports = authRoutes;
