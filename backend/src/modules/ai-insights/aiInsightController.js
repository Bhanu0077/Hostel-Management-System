const asyncHandler = require("../../utils/asyncHandler");
const aiInsightService = require("./aiInsightService");

const getInsights = asyncHandler(async (req, res) => {
  const insights = await aiInsightService.getInsights();
  res.json(insights);
});

module.exports = {
  getInsights
};
