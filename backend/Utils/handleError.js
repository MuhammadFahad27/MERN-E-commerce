class ErrorHandler extends Error {
    constructor(message, statusCode) {
        // Handle inverted arguments if passed as (statusCode, message)
        if (typeof message === 'number' && typeof statusCode === 'string') {
            const temp = message;
            message = statusCode;
            statusCode = temp;
        }

        super(message || 'Internal Server Error');
        this.statusCode = Number(statusCode) || 500;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Factory proxy so both `new ErrorHandler(...)` and `ErrorHandler(...)` work safely
function createErrorHandler(message, statusCode) {
    return new ErrorHandler(message, statusCode);
}

// Preserve prototype chain for instanceof ErrorHandler checks
Object.setPrototypeOf(createErrorHandler, ErrorHandler);
createErrorHandler.prototype = ErrorHandler.prototype;

module.exports = createErrorHandler;
