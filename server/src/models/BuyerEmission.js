// Buyer emission calculator

const mongoose = require('mongoose');

const buyerEmissionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  energyUse: { type: Number, required: true, min: 0 }, // unit to be specified (e.g., kWh)
  logisticsFuel: { type: Number, required: true, min: 0 }, // unit to be specified (e.g., liters)
  industrialProcesses: { type: Number, required: true, min: 0 }, // unit to be specified
  organicWaste: { type: Number, required: true, min: 0 }, // unit to be specified (e.g., Kg)
  calculatedEmissions: { type: Number, default: 0 }, // Calculated by the service
}, { timestamps: true });

const BuyerEmission = mongoose.model('BuyerEmission', buyerEmissionSchema);
module.exports = BuyerEmission;