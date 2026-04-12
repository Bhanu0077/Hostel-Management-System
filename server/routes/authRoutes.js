const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    sendOTP,
    verifyOTP,
    setPassword,
    login,
    forgotPassword,   // ✅ ADD THIS
    resetPassword     // ✅ ADD THIS (if used)
} = require('../controllers/authController');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/set-password', setPassword);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;