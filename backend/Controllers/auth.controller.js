const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const User = require("../Models/user.model");
const ErrorHandler = require("../Utils/handleError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
};

const signUp = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || !email.trim() || !password.trim()) {
        return next(new ErrorHandler('All fields are required', 400));
    }

    if (password.length < 6) {
        return next(new ErrorHandler('Password must have at least 6 characters', 400));
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { username: username.trim() }]
    });

    if (existingUser) {
        if (existingUser.email === normalizedEmail) {
            return next(new ErrorHandler('Email is already registered', 400));
        }
        return next(new ErrorHandler('Username is already taken', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    return res.status(201).json({
        success: true,
        message: "Sign up successful! Please sign in."
    });
});

const signIn = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || !email.trim() || !password.trim()) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    const normalizedEmail = email.trim().toLowerCase();
    const validUser = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!validUser) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isMatch = await bcrypt.compare(password, validUser.password);
    if (!isMatch) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const token = jwt.sign(
        {
            id: validUser._id,
            role: validUser.role || 'user',
            name: validUser.username,
            email: validUser.email
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' }
    );

    const cookieOptions = getCookieOptions();

    return res.cookie('token', token, cookieOptions).status(200).json({
        success: true,
        message: 'Signed in successfully',
        user: {
            id: validUser._id,
            role: validUser.role || 'user',
            name: validUser.username,
            email: validUser.email
        },
        token
    });
});

const signOut = catchAsyncErrors(async (req, res, next) => {
    const cookieOptions = getCookieOptions();
    res.clearCookie('token', cookieOptions);

    return res.status(200).json({
        success: true,
        message: 'Signed out successfully'
    });
});

const checkAuth = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(200).json({
            success: false,
            message: 'Not authenticated'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Authenticated',
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                role: user.role || 'user'
            }
        });
    } catch (err) {
        return res.status(200).json({
            success: false,
            message: 'Token expired or invalid'
        });
    }
});

module.exports = { signUp, signIn, signOut, checkAuth };
