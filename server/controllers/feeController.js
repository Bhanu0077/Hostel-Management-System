const Fee = require('../models/Fee');
const Student = require('../models/Student');


// 💰 Record Payment
exports.recordPayment = async (req, res) => {
    try {
        const { studentId, amount } = req.body;

        // Save payment
        const payment = await Fee.create({
            student: studentId,
            amount
        });

        // Update student paid amount
        const student = await Student.findById(studentId);
        student.paid += amount;
        await student.save();

        res.json({
            message: "Payment recorded",
            payment
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 📋 Get Fee History
exports.getFeeHistory = async (req, res) => {
    try {
        const history = await Fee.find()
            .populate('student', 'name phone')
            .sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};