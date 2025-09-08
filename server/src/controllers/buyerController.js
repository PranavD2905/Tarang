// Buyer credit calculator

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

// @desc    Calculate and save buyer's carbon emissions
// @route   POST /api/buyers/calculate-emissions
// @access  Private/Buyer
const calculateEmissions = asyncHandler(async (req, res) => {
  const { energyUse, logisticsFuel, industrialProcesses, organicWaste } = req.body;
  const buyerId = req.user._id;

  const emissionRecord = await emissionService.saveEmissionRecord({
    buyer: buyerId,
    energyUse,
    logisticsFuel,
    industrialProcesses,
    organicWaste,
  });

  res.status(201).json(emissionRecord);
});

module.exports = {
  calculateEmissions,
};