const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,

    parent: {
        name: String,
        phone: String,
        address: String
    },

    guardian: {
        name: String,
        phone: String,
        address: String
    },

    photo: String,   // file path
    aadhar: String,  // file path

    washingMachine: { type: Boolean, default: false },

    joiningDate: { type: Date, default: Date.now },

    gender: {
        type: String,
        enum: ['Male', 'Female']
    },

    inHostel: {
        type: Boolean,
        default: true
    },

    leavingDate: Date,

    leavingReason: String,

    permission: {
        type: Boolean,
        default: false
    },

    fee: Number,
    paid: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);