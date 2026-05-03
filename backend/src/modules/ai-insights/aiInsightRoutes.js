const express = require("express");
const controller = require("./aiInsightController");
const { authenticate } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/", controller.getInsights);

module.exports = router;
