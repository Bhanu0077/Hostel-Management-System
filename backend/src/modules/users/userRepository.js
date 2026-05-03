const db = require("../../config/database");

async function findByEmail(email) {
  const result = await db.query(
    `SELECT id, full_name, email, password_hash, role, created_at
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0] || null;
}

async function findById(id) {
  const result = await db.query(
    `SELECT id, full_name, email, role, created_at
     FROM users
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  findByEmail,
  findById
};
