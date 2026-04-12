// ✅ Mark Worker Attendance
const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
    try {
        const { workerId, status } = req.body;

        const today = new Date().toDateString();

        const alreadyMarked = await Attendance.findOne({
            worker: workerId,
            date: {
                $gte: new Date(today),
                $lt: new Date(new Date(today).getTime() + 86400000)
            }
        });

        if (alreadyMarked) {
            return res.status(400).json({ message: "Attendance already marked today" });
        }

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