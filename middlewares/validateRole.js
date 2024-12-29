const ApiError = require('../errors/ApiError');

const validateRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = req.user;

            if (!user || typeof user !== 'object' || !user.role) {
                return next(
                    new ApiError(
                        'Access Denied: No role information available',
                        400,
                    ),
                );
            }
            // Validate the role
            if (user.role !== role) {
                return next(
                    new ApiError(
                        'Access Denied: Insufficient permissions',
                        403,
                    ),
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};
module.exports = validateRole;
