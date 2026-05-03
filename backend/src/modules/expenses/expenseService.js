const HttpError = require("../../utils/httpError");
const expenseRepository = require("./expenseRepository");

function normalizeExpense(expense) {
  return {
    id: expense.id,
    title: expense.title,
    category: expense.category,
    amount: Number(expense.amount),
    expenseDate: expense.expense_date,
    notes: expense.notes,
    createdBy: expense.created_by,
    createdAt: expense.created_at
  };
}

async function listExpenses(filters) {
  const expenses = await expenseRepository.list(filters);
  const totals = await expenseRepository.summary(filters);

  return {
    items: expenses.map(normalizeExpense),
    totalsByCategory: totals.map((item) => ({
      category: item.category,
      totalAmount: Number(item.total_amount)
    }))
  };
}

async function createExpense(payload, user) {
  const requiredFields = ["title", "category", "amount", "expenseDate"];

  requiredFields.forEach((field) => {
    if (!payload[field] && payload[field] !== 0) {
      throw new HttpError(400, `${field} is required`);
    }
  });

  const expense = await expenseRepository.create({
    ...payload,
    createdBy: user.id
  });

  return normalizeExpense(expense);
}

module.exports = {
  listExpenses,
  createExpense
};
