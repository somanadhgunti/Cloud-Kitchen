const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Authenticate admin user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // 1. Check if user exists AND password matches AND they are an Admin
  if (user && (await user.matchPassword(password)) && user.isAdmin) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Send back a JWT token
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error('Invalid credentials or user is not an administrator');
  }
});

module.exports = { authUser };