const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Worker', 'Vegetables', 'Maintenance', 'Utilities', 'Other']
    },

    title: String,

    amount: Number,

    paymentMode: {
        type: String,
        enum: ['Cash', 'UPI', 'Bank']
    },

    date: {
        type: Date,
        default: Date.now
    },

    // Worker Payment
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    },

    // Vegetables
    items: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],

    // Maintenance
    materials: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ],

    billDate: Date,

    isPaid: {
        type: Boolean,
        default: true
    },

    note: String

}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);