const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);