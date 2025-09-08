const express = require('express');
const router = express.Router();
const { calculateEmissions } = require('../controllers/buyerController');
const { protect, isBuyer } = require('../middleware/authMiddleware');

router.post('/calculate-emissions', protect, isBuyer, calculateEmissions);

module.exports = router;