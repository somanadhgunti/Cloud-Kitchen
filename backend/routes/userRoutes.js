// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Authenticate admin user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)) && user.isAdmin) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    // Note: Using a generic error message for security reasons (don't reveal if user exists)
    res.status(401); 
    throw new Error('Invalid credentials or user is not an administrator');
  }
}));

module.exports = router;