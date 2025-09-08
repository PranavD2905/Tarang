// Signup/login/logout

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Credit = require('../models/Credit');
const Transaction = require('../models/Transaction');
const generateToken = require('../config/auth');
const creditService = require('../services/creditService');
const emissionService = require('../services/emissionService');
const transactionService = require('../services/transactionService');
const paymentService = require('../services/paymentService');
const certificateService = require('../services/certificateService');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user (token invalidated on client-side)
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // On the server, we can just send a success message.
  // The client is responsible for deleting the token from local storage or cookies.
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
