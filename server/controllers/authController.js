const User = require('../models/User');
const generateOTP = require('../services/otpService');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');


// 1️⃣ Send OTP
exports.sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;

        let user = await User.findOne({ phone });

        const otp = generateOTP();

        if (!user) {
            user = new User({ phone });
        }

        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        console.log("OTP:", otp); // for testing

        res.json({ message: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 2️⃣ Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const user = await User.findOne({ phone });

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
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });

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
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });

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