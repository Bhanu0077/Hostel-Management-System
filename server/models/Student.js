const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    fee: {
        type: Number,
        required: true
    },
    paid: {
        type: Number,
        default: 0
    },
    feeDueDate: Date,
    washingMachine: {
        type: Boolean,
        default: false
    },
    guardian: String
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);