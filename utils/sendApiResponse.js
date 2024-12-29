exports.sendApiSuccess = (res, data, message, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data: data,
        message: message,
    });
};
