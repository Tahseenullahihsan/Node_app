const express = require('express');
const router = express.Router();
const amplifierController = require('../controllers/amplifierController');

// Route to add a new amplifier
router.post('/add', amplifierController.addAmplifier);
router.get('/all', amplifierController.getAllAmplifiers);

module.exports = router;
