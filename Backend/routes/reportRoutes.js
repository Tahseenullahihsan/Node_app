const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to get the monthly sales report
router.get('/monthly-report', reportController.getMonthlyReport);

module.exports = router;
