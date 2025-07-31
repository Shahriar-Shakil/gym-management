import { sequelize } from "./database.js";
import MembershipPackage from "./membershipPackage.js";
import Payment from "./payment.js";
import User from "./user.js";
import UserMembership from "./userMembership.js";

// User associations
User.hasMany(Payment, { foreignKey: "userId" });
User.hasMany(UserMembership, { foreignKey: "userId" });

// Payment associations
Payment.belongsTo(User, { foreignKey: "userId" });
Payment.belongsTo(MembershipPackage, { foreignKey: "packageId" });
Payment.belongsTo(User, { as: "approver", foreignKey: "approvedBy" });

// UserMembership associations
UserMembership.belongsTo(User, { foreignKey: "userId" });
UserMembership.belongsTo(MembershipPackage, { foreignKey: "packageId" });
UserMembership.belongsTo(Payment, { foreignKey: "paymentId" });

// MembershipPackage associations
MembershipPackage.hasMany(Payment, { foreignKey: "packageId" });
MembershipPackage.hasMany(UserMembership, { foreignKey: "packageId" });

export { sequelize };
export { User, MembershipPackage, Payment, UserMembership };
