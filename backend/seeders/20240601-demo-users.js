const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash("password123", 10);

    // Check if users already exist
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Users"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingUsers[0].count > 0) {
      console.log("Users already exist, skipping user seed");
      return;
    }

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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
