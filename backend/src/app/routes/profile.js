// backend/src/app/routes/profile.js
import express from "express";
import {
  getMembership,
  getPaymentHistory,
  getProfile,
  requestPayment,
  updateProfile,
} from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// User profile routes
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

// Membership routes
router.get("/membership", authenticate, getMembership);

// Payment routes
router.post("/payment/request", authenticate, requestPayment);
router.get("/payment/history", authenticate, getPaymentHistory);

export default router;
