const db = require("../../config/database");

async function getInsights() {
  const [occupancyResult, roomStatusResult, expensesResult, trendResult] = await Promise.all([
    db.query(
      `SELECT COALESCE(SUM(occupied_beds), 0) AS occupied_beds,
              COALESCE(SUM(capacity), 0) AS total_capacity
       FROM rooms`
    ),
    db.query(
      `SELECT status, COUNT(*) AS count
       FROM rooms
       GROUP BY status`
    ),
    db.query(
      `SELECT category, SUM(amount)::numeric(12, 2) AS total
       FROM expenses
       GROUP BY category
       ORDER BY total DESC`
    ),
    db.query(
      `SELECT TO_CHAR(expense_date, 'YYYY-MM') AS month,
              SUM(amount)::numeric(12, 2) AS total
       FROM expenses
       GROUP BY TO_CHAR(expense_date, 'YYYY-MM')
       ORDER BY month DESC
       LIMIT 3`
    )
  ]);

  const occupancy = occupancyResult.rows[0];
  const occupiedBeds = Number(occupancy.occupied_beds);
  const totalCapacity = Number(occupancy.total_capacity);
  const occupancyRate = totalCapacity === 0 ? 0 : Number(((occupiedBeds / totalCapacity) * 100).toFixed(2));
  const topExpenseCategory = expensesResult.rows[0];
  const recentTrend = trendResult.rows[0];

  const recommendations = [];

  if (occupancyRate < 60) {
    recommendations.push("Occupancy is below 60%. Consider promotional pricing or faster room allocation workflows.");
  } else if (occupancyRate > 90) {
    recommendations.push("Occupancy is above 90%. Prepare overflow handling and maintenance scheduling for high-demand rooms.");
  } else {
    recommendations.push("Occupancy is healthy. Maintain allocation speed and monitor demand by block.");
  }

  if (topExpenseCategory) {
    recommendations.push(
      `${topExpenseCategory.category} is the highest expense category at INR ${Number(topExpenseCategory.total).toFixed(2)}. Review recurring costs in this bucket.`
    );
  }

  if (recentTrend) {
    recommendations.push(
      `Latest monthly expense snapshot for ${recentTrend.month} is INR ${Number(recentTrend.total).toFixed(2)}. Compare it against planned hostel budget.`
    );
  }

  return {
    metrics: {
      occupiedBeds,
      totalCapacity,
      occupancyRate,
      roomStatuses: roomStatusResult.rows.map((row) => ({
        status: row.status,
        count: Number(row.count)
      }))
    },
    expenseHighlights: expensesResult.rows.map((row) => ({
      category: row.category,
      total: Number(row.total)
    })),
    recommendations
  };
}

module.exports = {
  getInsights
};
