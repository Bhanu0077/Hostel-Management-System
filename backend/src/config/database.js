const { Pool } = require("pg");
const env = require("./env");

const isProduction = env.nodeEnv === "production";

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error", error);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};
