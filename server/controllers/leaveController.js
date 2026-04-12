const Leave = require('../models/Leave');


// ➕ Apply Leave
exports.applyLeave = async (req, res) => {
    try {
        const { studentId, fromDate, toDate, reason } = req.body;

        // ✅ BASIC VALIDATION
        if (!studentId || !fromDate || !toDate) {
            return res.status(400).json({ message: "All fields required" });
        }

        // ❌ Date validation
        if (new Date(fromDate) > new Date(toDate)) {
            return res.status(400).json({ message: "Invalid date range" });
        }

        // ❌ Prevent overlapping leave
        const overlap = await Leave.findOne({
            student: studentId,
            $or: [
                {
                    fromDate: { $lte: toDate },
                    toDate: { $gte: fromDate }
                }
            ]
        });

        if (overlap) {
            return res.status(400).json({ message: "Leave already exists in this range" });
        }

        const leave = await Leave.create({
            student: studentId,
            fromDate,
            toDate,
            reason
        });

        res.json(leave);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getActiveLeaves = async (req, res) => {
    try {
        const today = new Date();

        const activeLeaves = await Leave.find({
            fromDate: { $lte: today },
            toDate: { $gte: today }
        }).populate('student', 'name phone');

        res.json(activeLeaves);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};