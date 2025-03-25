'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipes', [
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        chefId: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Classic Margherita Pizza',
        description: 'Authentic Italian Margherita pizza with fresh basil and buffalo mozzarella.',
        ingredients: [
          'Pizza dough',
          'San Marzano tomatoes',
          'Fresh buffalo mozzarella',
          'Fresh basil leaves',
          'Extra virgin olive oil',
          'Sea salt'
        ],
        instructions: [
          'Preheat the oven to 450°F (230°C)',
          'Roll out the pizza dough',
          'Spread tomato sauce evenly',
          'Add fresh mozzarella slices',
          'Bake for 12-15 minutes',
          'Top with fresh basil and olive oil'
        ],
        prepTime: 30,
        cookTime: 15,
        servings: 4,
        tags: ['Italian', 'Pizza', 'Vegetarian'],
        rating: 4.7,
        totalReviews: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        chefId: '550e8400-e29b-41d4-a716-446655440004',
        name: 'California Roll',
        description: 'Classic California roll with crab meat, avocado, and cucumber.',
        ingredients: [
          'Sushi rice',
          'Nori sheets',
          'Crab meat',
          'Avocado',
          'Cucumber',
          'Sesame seeds'
        ],
        instructions: [
          'Prepare sushi rice',
          'Place nori sheet on bamboo mat',
          'Spread rice evenly',
          'Add crab meat, avocado, and cucumber',
          'Roll tightly',
          'Cut into 8 pieces'
        ],
        prepTime: 45,
        cookTime: 20,
        servings: 4,
        tags: ['Japanese', 'Sushi', 'Seafood'],
        rating: 4.8,
        totalReviews: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('recipes', null, {});
  }
}; 