import express from "express";
import {
  adminApproveUser,
  adminCreateUser,
  changePassword,
  getMe,
  listUsers,
  login,
  register,
} from "../controllers/authController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.post("/change-password", authenticate, changePassword);

router.post("/admin/users", authenticate, requireAdmin, adminCreateUser);
router.get("/admin/users", authenticate, requireAdmin, listUsers);
router.post(
  "/admin/approve/:userId",
  authenticate,
  requireAdmin,
  adminApproveUser
);

export default router;
