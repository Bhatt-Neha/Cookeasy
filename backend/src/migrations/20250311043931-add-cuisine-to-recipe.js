'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('recipes', 'cuisine', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'General' // Default value to handle existing records
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipes', 'cuisine');
  }
};
