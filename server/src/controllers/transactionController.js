const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Credit = require('../models/Credit');
const Transaction = require('../models/Transaction');
const generateToken = require('../config/auth');
const creditService = require('../services/creditService');
const emissionService = require('../services/emissionService');
const transactionService = require('../services/transactionService');
const paymentService = require('../services/paymentService');
// The line below has been removed:
// const certificateService = require('../services/certificateService');

// @desc    Initiate a credit purchase and complete transaction directly (skipping payment)
// @route   POST /api/transactions/buy
// @access  Private/Buyer
const initiatePurchase = asyncHandler(async (req, res) => {
  const { creditId, amount } = req.body;
  const buyerId = req.user._id;

  const credit = await Credit.findById(creditId);
  if (!credit) {
    res.status(404);
    throw new Error('Credit not found.');
  }

  // Ensure credit is available for sale and has enough units
  if (credit.status !== 'on_sale' || credit.amount < amount) {
    res.status(400);
    throw new Error('Credit is not available for purchase or not enough credits.');
  }

  const totalPrice = amount * credit.pricePerCredit;

  // Step 1: Create the transaction record
  const transaction = await transactionService.createTransaction(buyerId, creditId, amount, totalPrice);

  // Step 2: Update the credit status (deduct the purchased amount)
  // This is handled inside createTransaction in your services.

  // Step 3: Update buyer and seller credit counts in their profiles
  const buyer = await User.findById(buyerId);
  const seller = await User.findById(credit.seller);

  if (!buyer || !seller) {
    res.status(404);
    throw new Error('Buyer or seller not found.');
  }

  buyer.creditsOwned += amount;
  seller.creditsOwned -= amount;

  await buyer.save();
  await seller.save();

  // Step 4: Update the transaction status to 'completed'
  transaction.paymentStatus = 'completed';
  await transaction.save();

  // Step 5: The certificate generation code has been removed
  // const certificatePath = await certificateService.generateCertificate(transaction);

  res.status(200).json({
    message: 'Transaction completed',
    // The certificate path has been removed from the response
    transactionId: transaction._id,
  });
});

// @desc    Confirm a successful transaction (this endpoint is now obsolete as payment is skipped)
// @route   POST /api/transactions/confirm/:transactionId
// @access  Private/Buyer
const confirmTransaction = asyncHandler(async (req, res) => {
  res.status(400).json({ message: 'This endpoint is no longer in use as payment is being skipped.' });
});

module.exports = {
  initiatePurchase,
  confirmTransaction,
};