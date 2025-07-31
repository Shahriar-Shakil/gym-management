// backend/src/app/routes/admin.js
import express from "express";
import {
  approvePayment,
  createPackage,
  getUserMemberships,
  listPackages,
  listPendingPayments,
  rejectPayment,
  updatePackage,
} from "../controllers/adminController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Membership package management
router.get("/packages", authenticate, requireAdmin, listPackages);
router.post("/packages", authenticate, requireAdmin, createPackage);
router.put("/packages/:id", authenticate, requireAdmin, updatePackage);

// Payment management
router.get(
  "/payments/pending",
  authenticate,
  requireAdmin,
  listPendingPayments
);
router.post(
  "/payments/:paymentId/approve",
  authenticate,
  requireAdmin,
  approvePayment
);
router.post(
  "/payments/:paymentId/reject",
  authenticate,
  requireAdmin,
  rejectPayment
);

// User membership management
router.get("/memberships", authenticate, requireAdmin, getUserMemberships);

export default router;
