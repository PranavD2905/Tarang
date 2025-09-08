// Profile, account management

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Credit = require('../models/Credit');
const Transaction = require('../models/Transaction');
const BuyerEmission = require('../models/BuyerEmission');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get seller dashboard data
// @route   GET /api/users/seller/dashboard
// @access  Private/Seller
const getSellerDashboard = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const user = await User.findById(sellerId).select('-password');
  if (!user || user.role !== 'seller') {
    res.status(403);
    throw new Error('Access denied. Not a seller.');
  }

  // Find all credits submitted by this seller
  const submittedCredits = await Credit.find({ seller: sellerId }).sort({ createdAt: -1 });

  // Filter for listings that are currently for sale
  const listings = submittedCredits.filter(credit => credit.status === 'on_sale');

  res.status(200).json({
    sellerInfo: {
      name: user.name,
      email: user.email,
      currentCredits: user.creditsOwned
    },
    submittedCredits,
    listings,
  });
});

// @desc    Get buyer dashboard data
// @route   GET /api/users/buyer/dashboard
// @access  Private/Buyer
const getBuyerDashboard = asyncHandler(async (req, res) => {
  const buyerId = req.user._id;

  const user = await User.findById(buyerId).select('-password');
  if (!user || user.role !== 'buyer') {
    res.status(403);
    throw new Error('Access denied. Not a buyer.');
  }

  // Find all transactions made by this buyer
  const purchasedCredits = await Transaction.find({ buyer: buyerId })
    .populate('seller', 'name') // Populate seller info for the dashboard
    .populate('credit', 'type imageUrl') // Populate credit info
    .sort({ createdAt: -1 });

  // Find the buyer's emission calculation history
  const emissionHistory = await BuyerEmission.find({ buyer: buyerId }).sort({ createdAt: -1 });

  res.status(200).json({
    buyerInfo: {
      name: user.name,
      email: user.email,
      currentCredits: user.creditsOwned
    },
    purchasedCredits,
    emissionHistory,
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  getSellerDashboard,
  getBuyerDashboard,
};