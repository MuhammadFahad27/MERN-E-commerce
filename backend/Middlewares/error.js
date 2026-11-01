const HandleError = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose Cast Error (Invalid ObjectId)
    if (err.name === 'CastError') {
        message = `Resource not found. Invalid ID: ${err.value}`;
        statusCode = 404;
    }

    // Mongoose Duplicate Key Error (e.g. unique email/username)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'Field';
        message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
        statusCode = 400;
    }

    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        message = 'Invalid authentication token. Please log in again.';
        statusCode = 401;
    }
    if (err.name === 'TokenExpiredError') {
        message = 'Session expired. Please log in again.';
        statusCode = 401;
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = { HandleError };
