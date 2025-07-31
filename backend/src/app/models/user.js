import { DataTypes } from "sequelize";
import { sequelize } from "./database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Now optional
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true, // Now optional
      unique: true,
      validate: {
        is: /^\+?[0-9]{10,15}$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "member", "trainer"),
      allowNull: false,
      defaultValue: "member",
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "declined"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    validate: {
      emailOrMobile() {
        if (!this.email && !this.mobile) {
          throw new Error("Either email or mobile must be provided");
        }
      },
    },
  }
);

export default User;
