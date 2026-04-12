const Student = require('../models/Student');


// ➕ Add Student
exports.addStudent = async (req, res) => {
    try {
        // ✅ VALIDATION (ADD HERE — FIRST THING)
        if (!req.body.name || !req.body.fee) {
            return res.status(400).json({ message: "Name and fee required" });
        }

        // 👉 THEN DB OPERATION
        const student = await Student.create(req.body);

        res.json(student);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 📋 Get All Students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ❌ Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✏️ Update Student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};