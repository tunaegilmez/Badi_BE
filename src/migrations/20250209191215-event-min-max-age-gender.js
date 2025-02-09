"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Events", "minAge", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("Events", "maxAge", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("Events", "genderPreference", {
      type: Sequelize.ENUM("male", "female", "any"),
      allowNull: false,
      defaultValue: "any",
    });

    await queryInterface.addColumn("Events", "maxParticipants", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("Events", "currentParticipants", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Events", "minAge");
    await queryInterface.removeColumn("Events", "maxAge");
    await queryInterface.removeColumn("Events", "genderPreference");
    await queryInterface.removeColumn("Events", "maxParticipants");
    await queryInterface.removeColumn("Events", "currentParticipants");
  },
};
