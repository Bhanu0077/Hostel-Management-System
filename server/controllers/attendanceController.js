const Attendance = require('../models/Attendance');


// ✅ Mark Worker Attendance
exports.markAttendance = async (req, res) => {
    try {
        const { workerId, status } = req.body;

        const attendance = await Attendance.create({
            worker: workerId,
            status
        });

        res.json(attendance);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 📋 Get Attendance History
exports.getAttendance = async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate('worker', 'name role phone')
            .sort({ createdAt: -1 });

        res.json(records);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};