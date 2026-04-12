const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    addExpense,
    getExpenses,
    getWeeklyExpense
} = require('../controllers/expenseController');

router.post('/', protect, addExpense);
router.get('/', protect, getExpenses);
router.get('/weekly', protect, getWeeklyExpense);

module.exports = router;