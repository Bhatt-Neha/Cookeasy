"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("bookings", "startTime", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("bookings", "endTime", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface) => {
   
    await queryInterface.removeColumn("bookings", "startTime");
    await queryInterface.removeColumn("bookings", "endTime");
  },
};

