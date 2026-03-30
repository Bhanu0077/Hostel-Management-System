const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate OTP
const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();


// ================= SEND OTP =================
exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    console.log("OTP:", otp); // IMPORTANT (testing)

    res.json({ message: "OTP sent (check terminal)" });
};


// ================= VERIFY OTP =================
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;

    await user.save();

    res.json({ message: "OTP verified" });
};


// ================= SET PASSWORD =================
exports.setPassword = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
        return res.status(400).json({ message: "User not verified" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password set successfully" });
};


// ================= LOGIN =================
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.password) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        "secret123",
        { expiresIn: "7d" }
    );

    res.json({ token, role: user.role });
};