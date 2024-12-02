const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

// Route to generate a bill for a sale
router.post('/generate-bill', billController.generateBill);

module.exports = router;
