const errorHandler =(err, req, res, next) => {
    console.error('error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.isCustom ? err.message : 'internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
    });
};
module.exports = errorHandler;