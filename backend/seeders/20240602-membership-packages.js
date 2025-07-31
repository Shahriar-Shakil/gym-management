module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if packages already exist
    const existingPackages = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "MembershipPackages"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingPackages[0].count > 0) {
      console.log("Membership packages already exist, skipping package seed");
      return;
    }

    await queryInterface.bulkInsert("MembershipPackages", [
      {
        name: "1 Month Package",
        duration: 1,
        price: 50.0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "3 Months Package",
        duration: 3,
        price: 140.0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "6 Months Package",
        duration: 6,
        price: 250.0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("MembershipPackages", null, {});
  },
};
