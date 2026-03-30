const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/send-otp', auth.sendOTP);
router.post('/verify-otp', auth.verifyOTP);
router.post('/set-password', auth.setPassword);
router.post('/login', auth.login);

module.exports = router;