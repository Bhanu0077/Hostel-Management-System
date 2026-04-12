const express = require('express');
const router = express.Router();

const {
    addStudent,
    getStudents,
    deleteStudent
} = require('../controllers/studentController');

router.post('/', addStudent);
router.get('/', getStudents);
router.delete('/:id', deleteStudent);
router.put('/:id', updateStudent);

module.exports = router;