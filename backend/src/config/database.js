import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "gym_management",
  user: process.env.DB_USER || "gym_admin",
  password: process.env.DB_PASSWORD || "gym_password123",
  max: 20, // maximum number of clients in pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // return error after 2 seconds
  maxUses: 7500, // close connection after 7500 uses
};

// Create connection pool
export const pool = new Pool(dbConfig);

// Handle pool errors
pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");

    // Test query
    const result = await client.query("SELECT NOW()");
    console.log("📅 Database time:", result.rows[0].now);

    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

// Helper function for queries
export const query = (text, params) => pool.query(text, params);
