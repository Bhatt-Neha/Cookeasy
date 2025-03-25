'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        chefId: '550e8400-e29b-41d4-a716-446655440003',
        rating: 5.00,
        comment: 'Amazing Italian food! The pizza was authentic and delicious.',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        chefId: '550e8400-e29b-41d4-a716-446655440004',
        rating: 4.50,
        comment: 'Great sushi! The California roll was perfect.',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
}; 