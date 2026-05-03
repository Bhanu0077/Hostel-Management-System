const express = require("express");
const authRoutes = require("../modules/auth/authRoutes");
const studentRoutes = require("../modules/students/studentRoutes");
const roomRoutes = require("../modules/rooms/roomRoutes");
const expenseRoutes = require("../modules/expenses/expenseRoutes");
const aiInsightRoutes = require("../modules/ai-insights/aiInsightRoutes");

const router = express.Router();

router.use("/", authRoutes);
router.use("/students", studentRoutes);
router.use("/rooms", roomRoutes);
router.use("/expenses", expenseRoutes);
router.use("/ai-insights", aiInsightRoutes);

module.exports = router;
