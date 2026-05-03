const db = require("../../config/database");
const HttpError = require("../../utils/httpError");

async function list() {
  const result = await db.query(
    `SELECT r.id, r.block_name, r.room_number, r.capacity, r.occupied_beds,
            r.room_type, r.monthly_rent, r.status, r.created_at, r.updated_at,
            COALESCE(
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', s.id,
                  'fullName', s.full_name,
                  'email', s.email,
                  'status', s.status
                )
              ) FILTER (WHERE s.id IS NOT NULL),
              '[]'::json
            ) AS occupants
     FROM rooms r
     LEFT JOIN students s ON s.room_id = r.id
     GROUP BY r.id
     ORDER BY r.block_name, r.room_number`
  );

  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    `SELECT id, block_name, room_number, capacity, occupied_beds,
            room_type, monthly_rent, status, created_at, updated_at
     FROM rooms
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

async function create(payload) {
  const result = await db.query(
    `INSERT INTO rooms (
       block_name, room_number, capacity, occupied_beds, room_type, monthly_rent, status
     )
     VALUES ($1, $2, $3, 0, $4, $5, $6)
     RETURNING id, block_name, room_number, capacity, occupied_beds,
               room_type, monthly_rent, status, created_at, updated_at`,
    [
      payload.blockName,
      payload.roomNumber,
      payload.capacity,
      payload.roomType,
      payload.monthlyRent,
      payload.status
    ]
  );

  return result.rows[0];
}

async function ensureRoomHasCapacity(client, roomId) {
  const result = await client.query(
    `SELECT id, capacity, occupied_beds, status
     FROM rooms
     WHERE id = $1
     FOR UPDATE`,
    [roomId]
  );

  const room = result.rows[0];

  if (!room) {
    throw new HttpError(404, "Room not found");
  }

  if (room.status !== "available" && room.status !== "occupied") {
    throw new HttpError(400, "Room is not available for allocation");
  }

  if (room.occupied_beds >= room.capacity) {
    throw new HttpError(400, "Room is already full");
  }

  return room;
}

async function incrementOccupancy(client, roomId) {
  await client.query(
    `UPDATE rooms
     SET occupied_beds = occupied_beds + 1,
         status = CASE
           WHEN occupied_beds + 1 >= capacity THEN 'occupied'
           ELSE 'available'
         END,
         updated_at = NOW()
     WHERE id = $1`,
    [roomId]
  );
}

async function decrementOccupancy(client, roomId) {
  await client.query(
    `UPDATE rooms
     SET occupied_beds = GREATEST(occupied_beds - 1, 0),
         status = CASE
           WHEN GREATEST(occupied_beds - 1, 0) = 0 THEN 'available'
           WHEN GREATEST(occupied_beds - 1, 0) < capacity THEN 'available'
           ELSE 'occupied'
         END,
         updated_at = NOW()
     WHERE id = $1`,
    [roomId]
  );
}

async function assignStudent(client, roomId, studentId) {
  const result = await client.query(
    `UPDATE students
     SET room_id = $2,
         updated_at = NOW()
     WHERE id = $1
     RETURNING id, room_id`,
    [studentId, roomId]
  );

  return result.rows[0] || null;
}

module.exports = {
  list,
  findById,
  create,
  ensureRoomHasCapacity,
  incrementOccupancy,
  decrementOccupancy,
  assignStudent
};
