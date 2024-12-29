const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = async (payload) => {
    const token = jwt.sign(payload, config.jwtConfig.secretKey, {
        expiresIn: config.jwtConfig.expiresIn,
    });
    return token;
};

exports.verifyJwtToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const SECRET_KEY = config.jwtConfig.secretKey;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: 'Authorization token required',
        });
    }
    try {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token Format',
            });
        }
        const decode = jwt.verify(token, SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Session Expired',
                error: error.message,
            });
        }
        if (
            error instanceof jwt.JsonWebTokenError
        ) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token',
                error: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
            error: error.message,
            stack: error.stack,
        });
    }
};
