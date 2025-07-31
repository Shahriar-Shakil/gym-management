import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Seeder} */
export async function up(queryInterface, Sequelize) {
  const password = await bcrypt.hash("password123", 10);
  await queryInterface.bulkInsert("Users", [
    {
      name: "Admin User",
      email: "admin@gym.com",
      mobile: "+10000000001",
      password,
      role: "admin",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Active Member",
      email: "member@gym.com",
      mobile: "+10000000002",
      password,
      role: "member",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Pending Member",
      email: "pending@gym.com",
      mobile: "+10000000003",
      password,
      role: "member",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Active Trainer",
      email: "trainer@gym.com",
      mobile: "+10000000004",
      password,
      role: "trainer",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
}
