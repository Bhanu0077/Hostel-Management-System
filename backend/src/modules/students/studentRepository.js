const db = require("../../config/database");

async function list() {
  const result = await db.query(
    `SELECT s.id, s.full_name, s.email, s.phone, s.gender, s.guardian_name,
            s.guardian_phone, s.joined_on, s.status, s.room_id,
            r.room_number, r.block_name, r.capacity, r.occupied_beds,
            s.created_at, s.updated_at
     FROM students s
     LEFT JOIN rooms r ON r.id = s.room_id
     ORDER BY s.created_at DESC`
  );

  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    `SELECT id, full_name, email, phone, gender, guardian_name, guardian_phone,
            joined_on, status, room_id, created_at, updated_at
     FROM students
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

async function findByEmail(email) {
  const result = await db.query(
    `SELECT id, email
     FROM students
     WHERE email = $1`,
    [email]
  );

  return result.rows[0] || null;
}

async function create(client, payload) {
  const result = await client.query(
    `INSERT INTO students (
       full_name, email, phone, gender, guardian_name,
       guardian_phone, joined_on, status, room_id
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, full_name, email, phone, gender, guardian_name,
               guardian_phone, joined_on, status, room_id, created_at, updated_at`,
    [
      payload.fullName,
      payload.email,
      payload.phone,
      payload.gender,
      payload.guardianName,
      payload.guardianPhone,
      payload.joinedOn,
      payload.status,
      payload.roomId
    ]
  );

  return result.rows[0];
}

async function update(client, id, payload) {
  const result = await client.query(
    `UPDATE students
     SET full_name = $2,
         email = $3,
         phone = $4,
         gender = $5,
         guardian_name = $6,
         guardian_phone = $7,
         joined_on = $8,
         status = $9,
         room_id = $10,
         updated_at = NOW()
     WHERE id = $1
     RETURNING id, full_name, email, phone, gender, guardian_name,
               guardian_phone, joined_on, status, room_id, created_at, updated_at`,
    [
      id,
      payload.fullName,
      payload.email,
      payload.phone,
      payload.gender,
      payload.guardianName,
      payload.guardianPhone,
      payload.joinedOn,
      payload.status,
      payload.roomId
    ]
  );

  return result.rows[0] || null;
}

module.exports = {
  list,
  findById,
  findByEmail,
  create,
  update
};
