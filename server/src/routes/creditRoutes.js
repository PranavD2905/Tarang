const express = require('express');
const router = express.Router();
const {
  submitCredit,
  getMyCredits,
  getAvailableCredits,
  listCreditForSale,
} = require('../controllers/creditController');
const { protect, isSeller } = require('../middleware/authMiddleware');
// const fileUpload = require('../utils/fileUpload');

router.route('/')
  .post(protect, isSeller, submitCredit); 

router.get('/mycredits', protect, isSeller, getMyCredits);
router.get('/available', getAvailableCredits);
router.put('/list/:id', protect, isSeller, listCreditForSale);

module.exports = router;