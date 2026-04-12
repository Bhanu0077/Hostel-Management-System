const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    amount: Number,

    paymentDate: {
        type: Date,
        default: Date.now
    },

    paymentMode: {
        type: String,
        enum: ['Cash', 'UPI', 'Bank']
    },

    month: String, // "April 2026"

    reminderDate: Date,

    note: String

}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);