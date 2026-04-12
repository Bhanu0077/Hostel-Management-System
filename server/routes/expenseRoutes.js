const express = require('express');
const router = express.Router();

const {
    addExpense,
    getExpenses,
    getWeeklyExpense
} = require('../controllers/expenseController');

router.post('/', addExpense);
router.get('/', getExpenses);
router.get('/weekly', getWeeklyExpense);

module.exports = router;