const asyncHandler = require("../../utils/asyncHandler");
const roomService = require("./roomService");

const listRooms = asyncHandler(async (req, res) => {
  const rooms = await roomService.listRooms();
  res.json(rooms);
});

const createRoom = asyncHandler(async (req, res) => {
  const room = await roomService.createRoom(req.body);
  res.status(201).json(room);
});

const allocateRoom = asyncHandler(async (req, res) => {
  const room = await roomService.allocateRoom(req.params.roomId, req.body.studentId);
  res.json(room);
});

module.exports = {
  listRooms,
  createRoom,
  allocateRoom
};
