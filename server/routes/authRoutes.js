const express = require('express');
const router = express.Router();
const {
    sendOTP,
    verifyOTP,
    setPassword,
    login
} = require('../controllers/authController');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/set-password', setPassword);
router.post('/login', login);

module.exports = router;