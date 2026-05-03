const db = require("../../config/database");
const HttpError = require("../../utils/httpError");
const studentRepository = require("./studentRepository");
const roomRepository = require("../rooms/roomRepository");

function normalizeStudent(student) {
  return {
    id: student.id,
    fullName: student.full_name,
    email: student.email,
    phone: student.phone,
    gender: student.gender,
    guardianName: student.guardian_name,
    guardianPhone: student.guardian_phone,
    joinedOn: student.joined_on,
    status: student.status,
    roomId: student.room_id,
    room: student.room_number
      ? {
          roomNumber: student.room_number,
          blockName: student.block_name,
          capacity: student.capacity,
          occupiedBeds: student.occupied_beds
        }
      : null,
    createdAt: student.created_at,
    updatedAt: student.updated_at
  };
}

function validateStudentPayload(payload) {
  const requiredFields = ["fullName", "email", "phone"];

  requiredFields.forEach((field) => {
    if (!payload[field]) {
      throw new HttpError(400, `${field} is required`);
    }
  });
}

async function listStudents() {
  const students = await studentRepository.list();
  return students.map(normalizeStudent);
}

async function createStudent(payload) {
  validateStudentPayload(payload);
  const existing = await studentRepository.findByEmail(payload.email);

  if (existing) {
    throw new HttpError(409, "Student email already exists");
  }

  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    if (payload.roomId) {
      await roomRepository.ensureRoomHasCapacity(client, payload.roomId);
    }

    const createdStudent = await studentRepository.create(client, {
      ...payload,
      joinedOn: payload.joinedOn || new Date(),
      status: payload.status || "active",
      roomId: payload.roomId || null
    });

    if (payload.roomId) {
      await roomRepository.incrementOccupancy(client, payload.roomId);
    }

    await client.query("COMMIT");

    return normalizeStudent(createdStudent);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function updateStudent(id, payload) {
  validateStudentPayload(payload);

  const currentStudent = await studentRepository.findById(id);

  if (!currentStudent) {
    throw new HttpError(404, "Student not found");
  }

  const existingByEmail = await studentRepository.findByEmail(payload.email);

  if (existingByEmail && existingByEmail.id !== id) {
    throw new HttpError(409, "Student email already exists");
  }

  const previousRoomId = currentStudent.room_id;
  const nextRoomId = payload.roomId || null;
  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    if (nextRoomId && nextRoomId !== previousRoomId) {
      await roomRepository.ensureRoomHasCapacity(client, nextRoomId);
    }

    const updatedStudent = await studentRepository.update(client, id, {
      ...payload,
      joinedOn: payload.joinedOn || currentStudent.joined_on,
      status: payload.status || currentStudent.status,
      roomId: nextRoomId
    });

    if (previousRoomId && previousRoomId !== nextRoomId) {
      await roomRepository.decrementOccupancy(client, previousRoomId);
    }

    if (nextRoomId && previousRoomId !== nextRoomId) {
      await roomRepository.incrementOccupancy(client, nextRoomId);
    }

    await client.query("COMMIT");

    return normalizeStudent(updatedStudent);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  listStudents,
  createStudent,
  updateStudent
};
