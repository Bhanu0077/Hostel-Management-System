const User = require('../models/User');
const generateOTP = require('../services/otpService');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');


// 1️⃣ Send OTP
const sendEmail = require('../services/emailService');

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        let user = await User.findOne({ email });

        const otp = generateOTP();

        if (!user) {
            user = new User({ email });
        }

        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail(email, otp);

        res.json({ message: "OTP sent to email" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        res.json({ message: "OTP verified" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 3️⃣ Set Password
exports.setPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.otp = null;

        await user.save();

        res.json({ message: "Password set successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        res.json({
            token: generateToken(user._id),
            message: "Login successful"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sendEmail(email, otp);

        res.json({ message: "OTP sent to email" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};