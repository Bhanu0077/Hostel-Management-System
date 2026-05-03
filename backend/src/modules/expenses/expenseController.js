const asyncHandler = require("../../utils/asyncHandler");
const expenseService = require("./expenseService");

const listExpenses = asyncHandler(async (req, res) => {
  const data = await expenseService.listExpenses({
    category: req.query.category,
    month: req.query.month
  });

  res.json(data);
});

const createExpense = asyncHandler(async (req, res) => {
  const expense = await expenseService.createExpense(req.body, req.user);
  res.status(201).json(expense);
});

module.exports = {
  listExpenses,
  createExpense
};
