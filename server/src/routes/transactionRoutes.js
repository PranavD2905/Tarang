const express = require('express');
const router = express.Router();
const { initiatePurchase } = require('../controllers/transactionController');
const { protect, isBuyer } = require('../middleware/authMiddleware');

router.post('/buy', protect, isBuyer, initiatePurchase);

module.exports = router;