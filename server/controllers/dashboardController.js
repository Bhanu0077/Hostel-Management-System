const Student = require('../models/Student');
const Expense = require('../models/Expense');

exports.getDashboard = async (req, res) => {
    try {
        const students = await Student.find();
        const expenses = await Expense.find();

        const totalStudents = students.length;

        const totalPending = students.reduce(
            (sum, s) => sum + (s.fee - s.paid),
            0
        );

        const totalCollected = students.reduce(
            (sum, s) => sum + s.paid,
            0
        );

        const totalExpenses = expenses.reduce(
            (sum, e) => sum + e.amount,
            0
        );

        res.json({
            totalStudents,
            totalPending,
            totalCollected,
            totalExpenses
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};