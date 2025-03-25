'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add image field to users table
    await queryInterface.addColumn('users', 'profileImage', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });

    // Add image field to chefs table
    await queryInterface.addColumn('chefs', 'profileImage', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });

    // Add image field to recipes table
    await queryInterface.addColumn('recipes', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove image fields
    await queryInterface.removeColumn('users', 'profileImage');
    await queryInterface.removeColumn('chefs', 'profileImage');
    await queryInterface.removeColumn('recipes', 'image');
  }
}; 