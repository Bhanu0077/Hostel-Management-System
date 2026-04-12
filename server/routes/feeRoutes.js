const express = require('express');
const router = express.Router();

const {
    recordPayment,
    getFeeHistory
} = require('../controllers/feeController');

router.post('/pay', recordPayment);
router.get('/history', getFeeHistory);

module.exports = router;