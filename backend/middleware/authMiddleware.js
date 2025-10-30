const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); 

// Middleware to protect routes and verify admin status
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user, excluding password
            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            
            // Check for admin role
            if (!user.isAdmin) {
                res.status(401);
                throw new Error('Not authorized, not an administrator');
            }

            req.user = user;
            next();

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed or expired');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

module.exports = { protect };