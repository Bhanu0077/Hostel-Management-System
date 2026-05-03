const express = require("express");
const controller = require("./expenseController");
const { authenticate } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/", controller.listExpenses);
router.post("/", controller.createExpense);

module.exports = router;
