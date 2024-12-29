const validateRequestSchema = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[source], { abortEarly: false });
        if (error) {
            // Extract and format the first error message
            const errorMessage = error.details[0].message.replace(/['"]/g, '');
            return next({
                status: 400,
                message: errorMessage,
            });
        }
        next();
    };
};

module.exports = validateRequestSchema;
