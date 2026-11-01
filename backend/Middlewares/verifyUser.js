const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/handleError");

const verifyUser = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        // Support Bearer token from Authorization header (solves cross-port cookie blocking)
        if (!token && req.headers?.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token && req.headers?.['x-auth-token']) {
            token = req.headers['x-auth-token'];
        }

        if (!token) {
            return next(new ErrorHandler('Please login to continue', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return next(new ErrorHandler('Session expired or invalid. Please login again.', 401));
    }
};

module.exports = verifyUser;
