const Student = require('../models/Student');
const Expense = require('../models/Expense');
const Leave = require('../models/Leave');

exports.getDashboard = async (req, res) => {
    try {
        const today = new Date();

        // 👨‍🎓 All students
        const students = await Student.find();

        const totalStudents = students.length;

        // 🚫 Students on leave
        const activeLeaves = await Leave.find({
            fromDate: { $lte: today },
            toDate: { $gte: today }
        });

        const leaveStudentIds = activeLeaves.map(l => l.student.toString());

        // 🏠 Students in hostel
        const studentsInHostel = students.filter(
            s => !leaveStudentIds.includes(s._id.toString())
        );

        // 🍛 Food count
        const foodCount = studentsInHostel.length;

        // 💰 Pending fees
        const pendingStudents = students.filter(
            s => (s.fee - s.paid) > 0
        );

        const totalPending = pendingStudents.reduce(
            (sum, s) => sum + (s.fee - s.paid),
            0
        );

        // 💸 Expenses
        const expenses = await Expense.find();

        const totalExpenses = expenses.reduce(
            (sum, e) => sum + e.amount,
            0
        );

        res.json({
            totalStudents,
            inHostel: studentsInHostel.length,
            onLeave: activeLeaves.length,
            foodCount,
            pendingStudents: pendingStudents.length,
            totalPending,
            totalExpenses
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};