const Student = require('../models/Student');


// 📊 Dashboard Stats
exports.getDashboard = async (req, res) => {
    try {
        const students = await Student.find();

        const totalStudents = students.length;

        let totalPending = 0;

        students.forEach(student => {
            totalPending += (student.fee - student.paid);
        });

        res.json({
            totalStudents,
            totalPending
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};