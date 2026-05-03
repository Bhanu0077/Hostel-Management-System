const db = require("../../config/database");

function buildExpenseFilter(filters = {}) {
  const values = [];
  const conditions = [];

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`category = $${values.length}`);
  }

  if (filters.month) {
    values.push(filters.month);
    conditions.push(`TO_CHAR(expense_date, 'YYYY-MM') = $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  return { values, whereClause };
}

async function list(filters = {}) {
  const { values, whereClause } = buildExpenseFilter(filters);

  const result = await db.query(
    `SELECT id, title, category, amount, expense_date, notes, created_by, created_at
     FROM expenses
     ${whereClause}
     ORDER BY expense_date DESC, created_at DESC`,
    values
  );

  return result.rows;
}

async function create(payload) {
  const result = await db.query(
    `INSERT INTO expenses (title, category, amount, expense_date, notes, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, title, category, amount, expense_date, notes, created_by, created_at`,
    [
      payload.title,
      payload.category,
      payload.amount,
      payload.expenseDate,
      payload.notes,
      payload.createdBy
    ]
  );

  return result.rows[0];
}

async function summary(filters = {}) {
  const { values, whereClause } = buildExpenseFilter(filters);

  const result = await db.query(
    `SELECT category,
            SUM(amount)::numeric(12, 2) AS total_amount
     FROM expenses
     ${whereClause}
     GROUP BY category
     ORDER BY total_amount DESC`,
    values
  );

  return result.rows;
}

module.exports = {
  list,
  create,
  summary
};
