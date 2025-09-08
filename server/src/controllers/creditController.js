const asyncHandler = require('express-async-handler');
const creditService = require('../services/creditService');
const Credit = require('../models/Credit');
const User = require('../models/User');

// @desc    Submit new carbon credit data
// @route   POST /api/credits
// @access  Private/Seller
const submitCredit = asyncHandler(async (req, res) => {
  // Now we expect the image URL directly in the request body
  const { type, imageUrl, geolocation, documentation, form, pricePerCredit } = req.body;
  const sellerId = req.user._id;

  // No file validation needed since we're not handling an upload
  if (!imageUrl) {
    res.status(400);
    throw new Error('Image URL is required for submission.');
  }

  const newCredit = await creditService.createCredit(type, {
    seller: sellerId,
    imageUrl, // Pass the URL from the request body
    geolocation,
    documentation,
    form,
    pricePerCredit,
  });

  res.status(201).json(newCredit);
});

// @desc    Get a seller's credits
// @route   GET /api/credits/mycredits
// @access  Private/Seller
const getMyCredits = asyncHandler(async (req, res) => {
  const sellerCredits = await Credit.find({ seller: req.user._id });
  res.status(200).json(sellerCredits);
});

// @desc    Get all available credits for buyers
// @route   GET /api/credits/available
// @access  Public
const getAvailableCredits = asyncHandler(async (req, res) => {
  const availableCredits = await Credit.find({ status: 'on_sale', amount: { $gt: 0 } }).populate('seller', 'name');
  res.status(200).json(availableCredits);
});

// @desc    Seller lists an approved credit for sale
// @route   PUT /api/credits/list/:id
// @access  Private/Seller
const listCreditForSale = asyncHandler(async (req, res) => {
  const { pricePerCredit } = req.body;
  const creditId = req.params.id;
  const sellerId = req.user._id;

  const credit = await Credit.findById(creditId);

  if (!credit) {
    res.status(404);
    throw new Error('Credit not found');
  }

  if (credit.seller.toString() !== sellerId.toString()) {
    res.status(403);
    throw new Error('Not authorized to list this credit');
  }
  
  credit.status = 'on_sale';
  credit.pricePerCredit = pricePerCredit;

  const updatedCredit = await credit.save();
  
  res.status(200).json(updatedCredit);
});

module.exports = {
  submitCredit,
  getMyCredits,
  getAvailableCredits,
  listCreditForSale
};