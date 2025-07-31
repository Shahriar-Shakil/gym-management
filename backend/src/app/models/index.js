import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "gym_management",
  process.env.DB_USER || "gym_admin",
  process.env.DB_PASSWORD || "gym_password123",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

export { sequelize, Sequelize };
