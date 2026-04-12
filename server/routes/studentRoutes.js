const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudent
} = require('../controllers/studentController');

router.post('/', protect, addStudent);
router.get('/', protect, getStudents);
router.delete('/:id', protect, deleteStudent);
router.put('/:id', protect, updateStudent);

module.exports = router;