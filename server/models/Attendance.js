const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Worker', 'Student']
    },

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave']
    },

    date: {
        type: Date,
        default: Date.now
    },

    reason: String

}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);