// backend/src/app/models/userMembership.js
import { DataTypes } from "sequelize";
import { sequelize } from "./database.js";

const UserMembership = sequelize.define(
  "UserMembership",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MembershipPackages",
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "expired", "pending"),
      defaultValue: "pending",
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Payments",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default UserMembership;
