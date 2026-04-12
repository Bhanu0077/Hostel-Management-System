const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    recordPayment,
    getFeeHistory
} = require('../controllers/feeController');

router.post('/pay', protect, recordPayment);
router.get('/history', protect, getFeeHistory);

module.exports = router;