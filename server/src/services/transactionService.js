// Handle credit purchases

const Credit = require('../models/Credit');
const Transaction = require('../models/Transaction');

/**
 * Handles the purchase of carbon credits.
 * @param {string} buyerId - The ID of the buyer.
 * @param {string} creditId - The ID of the credit being purchased.
 * @param {number} amount - The amount of credits to purchase.
 * @param {number} totalPrice - The total price of the transaction.
 * @returns {Promise<object>} The created transaction document.
 */
const createTransaction = async (buyerId, creditId, amount, totalPrice) => {
  const credit = await Credit.findById(creditId);
  if (!credit) {
    throw new Error('Credit not found.');
  }

  if (credit.amount < amount) {
    throw new Error('Not enough credits available.');
  }

  // Deduct credits from the seller's available amount
  credit.amount -= amount;
  await credit.save();

  // Create a new transaction record
  const transaction = new Transaction({
    buyer: buyerId,
    seller: credit.seller,
    credit: creditId,
    amount,
    totalPrice,
    paymentStatus: 'pending', // Set to completed after successful payment
  });

  await transaction.save();
  return transaction;
};

module.exports = {
  createTransaction,
};