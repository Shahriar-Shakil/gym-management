import bcrypt from "bcrypt";
import { sequelize } from "../src/app/models/database.js";
import MembershipPackage from "../src/app/models/membershipPackage.js";
import User from "../src/app/models/user.js";

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if users exist
    const userCount = await User.count();
    if (userCount === 0) {
      console.log("👥 Creating demo users...");
      const password = await bcrypt.hash("password123", 10);

      await User.bulkCreate([
        {
          name: "Admin User",
          email: "admin@gym.com",
          mobile: "+10000000001",
          password,
          role: "admin",
          status: "active",
        },
        {
          name: "Active Member",
          email: "member@gym.com",
          mobile: "+10000000002",
          password,
          role: "member",
          status: "active",
        },
        {
          name: "Pending Member",
          email: "pending@gym.com",
          mobile: "+10000000003",
          password,
          role: "member",
          status: "pending",
        },
        {
          name: "Active Trainer",
          email: "trainer@gym.com",
          mobile: "+10000000004",
          password,
          role: "trainer",
          status: "active",
        },
      ]);
      console.log("✅ Demo users created successfully!");
    } else {
      console.log("👥 Users already exist, skipping...");
    }

    // Check if membership packages exist
    const packageCount = await MembershipPackage.count();
    if (packageCount === 0) {
      console.log("📦 Creating membership packages...");

      await MembershipPackage.bulkCreate([
        {
          name: "1 Month Package",
          duration: 1,
          price: 50.0,
          isActive: true,
        },
        {
          name: "3 Months Package",
          duration: 3,
          price: 140.0,
          isActive: true,
        },
        {
          name: "6 Months Package",
          duration: 6,
          price: 250.0,
          isActive: true,
        },
      ]);
      console.log("✅ Membership packages created successfully!");
    } else {
      console.log("📦 Membership packages already exist, skipping...");
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
