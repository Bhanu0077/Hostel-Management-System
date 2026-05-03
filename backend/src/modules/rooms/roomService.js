const db = require("../../config/database");
const HttpError = require("../../utils/httpError");
const roomRepository = require("./roomRepository");
const studentRepository = require("../students/studentRepository");

function normalizeRoom(room) {
  return {
    id: room.id,
    blockName: room.block_name,
    roomNumber: room.room_number,
    capacity: room.capacity,
    occupiedBeds: room.occupied_beds,
    availableBeds: room.capacity - room.occupied_beds,
    roomType: room.room_type,
    monthlyRent: room.monthly_rent,
    status: room.status,
    occupants: room.occupants || [],
    createdAt: room.created_at,
    updatedAt: room.updated_at
  };
}

async function listRooms() {
  const rooms = await roomRepository.list();
  return rooms.map(normalizeRoom);
}

async function createRoom(payload) {
  const requiredFields = ["blockName", "roomNumber", "capacity", "roomType", "monthlyRent"];

  requiredFields.forEach((field) => {
    if (!payload[field] && payload[field] !== 0) {
      throw new HttpError(400, `${field} is required`);
    }
  });

  const room = await roomRepository.create({
    ...payload,
    status: payload.status || "available"
  });

  return normalizeRoom(room);
}

async function allocateRoom(roomId, studentId) {
  if (!studentId) {
    throw new HttpError(400, "studentId is required");
  }

  const student = await studentRepository.findById(studentId);

  if (!student) {
    throw new HttpError(404, "Student not found");
  }

  const previousRoomId = student.room_id;

  if (previousRoomId === roomId) {
    const room = await roomRepository.findById(roomId);

    if (!room) {
      throw new HttpError(404, "Room not found");
    }

    return normalizeRoom({ ...room, occupants: [] });
  }

  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    await roomRepository.ensureRoomHasCapacity(client, roomId);

    if (previousRoomId && previousRoomId !== roomId) {
      await roomRepository.decrementOccupancy(client, previousRoomId);
    }

    await roomRepository.assignStudent(client, roomId, studentId);
    await roomRepository.incrementOccupancy(client, roomId);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  const room = await roomRepository.findById(roomId);
  return normalizeRoom({ ...room, occupants: undefined });
}

module.exports = {
  listRooms,
  createRoom,
  allocateRoom
};
