'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('chefs', [
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        cuisine: 'Italian',
        bio: 'Passionate Italian chef with 10 years of experience in authentic Italian cuisine.',
        rating: 4.8,
        totalReviews: 25,
        availability: JSON.stringify({
          monday: { start: '09:00', end: '17:00' },
          tuesday: { start: '09:00', end: '17:00' },
          wednesday: { start: '09:00', end: '17:00' },
          thursday: { start: '09:00', end: '17:00' },
          friday: { start: '09:00', end: '17:00' },
          saturday: { start: '10:00', end: '18:00' },
          sunday: { start: '10:00', end: '18:00' }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        cuisine: 'Japanese',
        bio: 'Expert in Japanese cuisine with a focus on sushi and traditional dishes.',
        rating: 4.9,
        totalReviews: 30,
        availability: JSON.stringify({
          monday: { start: '10:00', end: '18:00' },
          tuesday: { start: '10:00', end: '18:00' },
          wednesday: { start: '10:00', end: '18:00' },
          thursday: { start: '10:00', end: '18:00' },
          friday: { start: '10:00', end: '18:00' },
          saturday: { start: '11:00', end: '19:00' },
          sunday: { start: '11:00', end: '19:00' }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('chefs', null, {});
  }
}; 