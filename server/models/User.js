const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date
});

module.exports = mongoose.model('User', userSchema);