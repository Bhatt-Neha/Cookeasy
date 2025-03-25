'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bookings', [
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        chefId: '550e8400-e29b-41d4-a716-446655440003',
        bookingDate: new Date('2024-03-15T14:00:00Z'),
        duration: 2,
        totalPrice: 150.00,
        status: 'confirmed',
        specialRequests: 'Please prepare vegetarian options',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        chefId: '550e8400-e29b-41d4-a716-446655440004',
        bookingDate: new Date('2024-03-20T19:00:00Z'),
        duration: 3,
        totalPrice: 200.00,
        status: 'pending',
        specialRequests: 'Allergic to shellfish',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  }
}; 