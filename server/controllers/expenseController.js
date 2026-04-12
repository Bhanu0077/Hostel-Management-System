const Expense = require('../models/Expense');


// ➕ Add Expense
exports.addExpense = async (req, res) => {
    try {
        if (!req.body.title || !req.body.amount) {
            return res.status(400).json({ message: "Title and amount required" });
        }
        const expense = await Expense.create(req.body);
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 📋 Get All Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 📊 Weekly Total
exports.getWeeklyExpense = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const expenses = await Expense.find({
            createdAt: { $gte: lastWeek }
        });

        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        res.json({
            totalWeeklyExpense: total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};