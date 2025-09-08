const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const creditRoutes = require('./creditRoutes');
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const buyerRoutes = require('./buyerRoutes');

// Mount the route files to their respective base paths
router.use('/auth', authRoutes);
router.use('/credits', creditRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/buyers', buyerRoutes);

module.exports = router;