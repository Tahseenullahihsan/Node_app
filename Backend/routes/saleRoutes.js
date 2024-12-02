const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Route to sell an amplifier
router.post('/sell', saleController.sellAmplifier);

module.exports = router;
