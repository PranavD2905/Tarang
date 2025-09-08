//Seller credit submissions
// It would be better to define a specific, nested schema for each credit type to ensure data consistency

const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['c02', 'methane', 'plastic'],
    required: true,
  },
  imageUrl: { type: String, required: true },
  geolocation: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  documentation: { type: String, required: true },
  amount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'on_sale'], // Add 'on_sale' here
    default: 'pending' 
  },
  pricePerCredit: { type: Number, required: true },
}, {
  timestamps: true,
  discriminatorKey: 'type',
});

const Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;