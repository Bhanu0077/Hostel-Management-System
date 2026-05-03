const express = require("express");
const controller = require("./studentController");
const { authenticate } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/", controller.listStudents);
router.post("/", controller.createStudent);
router.put("/:studentId", controller.updateStudent);

module.exports = router;
