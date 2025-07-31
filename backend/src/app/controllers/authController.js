import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !password || (!email && !mobile)) {
      return res
        .status(400)
        .json({ message: "Name, password, and email or mobile are required." });
    }
    const existing = await User.findOne({
      where: { [email ? "email" : "mobile"]: email || mobile },
    });
    if (existing) {
      return res.status(409).json({ message: "User already exists." });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      mobile,
      password: hash,
      role: "member",
      status: "pending",
    });
    res
      .status(201)
      .json({ message: "Registration successful. Awaiting admin approval." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    if ((!email && !mobile) || !password) {
      return res
        .status(400)
        .json({ message: "Email or mobile and password are required." });
    }
    const user = await User.findOne({ where: email ? { email } : { mobile } });
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.status !== "active")
      return res.status(403).json({ message: "Account not active." });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials." });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminCreateUser = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    if (!name || !password || (!email && !mobile) || !role) {
      return res.status(400).json({
        message: "Name, password, role, and email or mobile are required.",
      });
    }
    const existing = await User.findOne({
      where: { [email ? "email" : "mobile"]: email || mobile },
    });
    if (existing) {
      return res.status(409).json({ message: "User already exists." });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      mobile,
      password: hash,
      role,
      status: "active",
    });
    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminApproveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action } = req.body; // 'approve' or 'decline'
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.status !== "pending")
      return res.status(400).json({ message: "User is not pending." });
    user.status = action === "approve" ? "active" : "declined";
    await user.save();
    res.json({ message: `User ${action}d successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMe = async (req, res) => {
  const { id, name, email, mobile, role, status, createdAt, updatedAt } =
    req.user;
  res.json({ id, name, email, mobile, role, status, createdAt, updatedAt });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Old and new password required." });
  }
  const match = await bcrypt.compare(oldPassword, req.user.password);
  if (!match) {
    return res.status(401).json({ message: "Old password is incorrect." });
  }
  req.user.password = await bcrypt.hash(newPassword, 10);
  await req.user.save();
  res.json({ message: "Password changed successfully." });
};
export const listUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "name",
      "email",
      "mobile",
      "role",
      "status",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.json(users);
};
