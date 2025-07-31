import MembershipPackage from "../models/membershipPackage.js";
import Payment from "../models/payment.js";
import User from "../models/user.js";
import UserMembership from "../models/userMembership.js";

// Membership Package Management
export const listPackages = async (req, res) => {
  try {
    const packages = await MembershipPackage.findAll({
      order: [["duration", "ASC"]],
    });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    if (!name || !duration || !price) {
      return res
        .status(400)
        .json({ message: "Name, duration, and price are required." });
    }

    const membershipPackage = await MembershipPackage.create({
      name,
      duration: parseInt(duration),
      price: parseFloat(price),
    });

    res.status(201).json({
      message: "Package created successfully.",
      package: membershipPackage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, price, isActive } = req.body;

    const membershipPackage = await MembershipPackage.findByPk(id);
    if (!membershipPackage) {
      return res.status(404).json({ message: "Package not found." });
    }

    await membershipPackage.update({
      name: name || membershipPackage.name,
      duration: duration ? parseInt(duration) : membershipPackage.duration,
      price: price ? parseFloat(price) : membershipPackage.price,
      isActive: isActive !== undefined ? isActive : membershipPackage.isActive,
    });

    res.json({
      message: "Package updated successfully.",
      package: membershipPackage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Payment Management
export const listPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { status: "pending" },
      include: [
        { model: User, attributes: ["name", "email", "mobile"] },
        { model: MembershipPackage, attributes: ["name", "duration", "price"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { notes } = req.body;

    const payment = await Payment.findByPk(paymentId, {
      include: [{ model: MembershipPackage }, { model: User }],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    if (payment.status !== "pending") {
      return res.status(400).json({ message: "Payment is not pending." });
    }

    // Update payment status
    await payment.update({
      status: "approved",
      approvedBy: req.user.id,
      approvedAt: new Date(),
      notes: notes || payment.notes,
    });

    // Create or update user membership
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + payment.MembershipPackage.duration);

    await UserMembership.create({
      userId: payment.userId,
      packageId: payment.packageId,
      startDate,
      endDate,
      status: "active",
      paymentId: payment.id,
    });

    res.json({
      message: "Payment approved and membership activated successfully.",
      membership: {
        startDate,
        endDate,
        status: "active",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { notes } = req.body;

    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    if (payment.status !== "pending") {
      return res.status(400).json({ message: "Payment is not pending." });
    }

    await payment.update({
      status: "rejected",
      approvedBy: req.user.id,
      approvedAt: new Date(),
      notes: notes || payment.notes,
    });

    res.json({ message: "Payment rejected successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Membership Management
export const getUserMemberships = async (req, res) => {
  try {
    const memberships = await UserMembership.findAll({
      include: [
        { model: User, attributes: ["name", "email", "mobile"] },
        { model: MembershipPackage, attributes: ["name", "duration", "price"] },
        { model: Payment, attributes: ["amount", "status", "createdAt"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
