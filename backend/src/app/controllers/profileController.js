import MembershipPackage from "../models/membershipPackage.js";
import Payment from "../models/payment.js";
import User from "../models/user.js";
import UserMembership from "../models/userMembership.js";

export const getProfile = async (req, res) => {
  try {
    const { id, name, email, mobile, role, status, createdAt, updatedAt } =
      req.user;
    res.json({ id, name, email, mobile, role, status, createdAt, updatedAt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const user = req.user;

    // Check if email/mobile is already taken by another user
    if (email && email !== user.email) {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(409).json({ message: "Email already exists." });
      }
    }

    if (mobile && mobile !== user.mobile) {
      const existing = await User.findOne({ where: { mobile } });
      if (existing) {
        return res.status(409).json({ message: "Mobile already exists." });
      }
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      mobile: mobile || user.mobile,
    });
    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMembership = async (req, res) => {
  try {
    const membership = await UserMembership.findOne({
      where: { userId: req.user.id },
      include: [
        { model: MembershipPackage, attributes: ["name", "duration", "price"] },
        { model: Payment, attributes: ["amount", "status", "createdAt"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!membership) {
      return res.status(404).json({ message: "No membership found." });
    }

    res.json(membership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const requestPayment = async (req, res) => {
  try {
    const { packageId, paymentMethod, referenceNumber, transactionId, amount } =
      req.body;

    if (!packageId || !paymentMethod || !referenceNumber || !amount) {
      return res.status(400).json({
        message:
          "Package ID, payment method, reference number, and amount are required.",
      });
    }

    // Check if package exists and is active
    const findPackage = await MembershipPackage.findByPk(packageId);
    if (!findPackage || !findPackage.isActive) {
      return res
        .status(404)
        .json({ message: "Package not found or inactive." });
    }

    // Check if reference number is already used
    const existingPayment = await Payment.findOne({
      where: { referenceNumber },
    });
    if (existingPayment) {
      return res
        .status(409)
        .json({ message: "Reference number already used." });
    }

    const payment = await Payment.create({
      userId: req.user.id,
      packageId,
      amount,
      paymentMethod,
      referenceNumber,
      transactionId,
      status: "pending",
    });

    res.status(201).json({
      message:
        "Payment request submitted successfully. Awaiting admin approval.",
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.user.id },
      include: [{ model: MembershipPackage, attributes: ["name", "duration"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
