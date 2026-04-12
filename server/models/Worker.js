const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: String,
    phone: String,

    role: String, // cook, cleaner

    salary: Number,

    workDetails: String,

    joinedDate: Date,

}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);