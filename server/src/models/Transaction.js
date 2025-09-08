// Buyer purchases

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  credit: { type: mongoose.Schema.Types.ObjectId, ref: 'Credit', required: true },
  amount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  certificateId: { type: String }, // For a unique certificate
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;