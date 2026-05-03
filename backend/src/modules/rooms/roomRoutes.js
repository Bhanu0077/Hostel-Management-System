const express = require("express");
const controller = require("./roomController");
const { authenticate } = require("../../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/", controller.listRooms);
router.post("/", controller.createRoom);
router.post("/:roomId/allocate", controller.allocateRoom);

module.exports = router;
