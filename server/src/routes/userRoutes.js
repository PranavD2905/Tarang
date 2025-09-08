const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getSellerDashboard,
  getBuyerDashboard,
} = require('../controllers/userController');
const { protect, isSeller, isBuyer } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.get('/seller/dashboard', protect, isSeller, getSellerDashboard);
router.get('/buyer/dashboard', protect, isBuyer, getBuyerDashboard);

module.exports = router;