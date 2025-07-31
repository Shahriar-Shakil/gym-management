import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { sequelize } from "./app/models/index.js";
import MembershipPackage from "./app/models/membershipPackage.js";
import Payment from "./app/models/payment.js";
import User from "./app/models/user.js";
import UserMembership from "./app/models/userMembership.js";
import adminRouter from "./app/routes/admin.js";
import authRouter from "./app/routes/auth.js";
import profileRouter from "./app/routes/profile.js";
import { pool, testConnection } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test database connection on startup
await testConnection();

// Before starting the server, sync Sequelize models
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database & tables synced!");
  } catch (err) {
    console.error("❌ Sequelize sync error:", err);
    process.exit(1);
  }
})();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api/", limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Register routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/admin", adminRouter);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();

    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      version: "1.0.0",
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error.message,
    });
  }
});

// Basic API route
app.get("/api", (req, res) => {
  res.json({
    message: "Gym Management API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      users: "/api/users",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
});

export default app;
