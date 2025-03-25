import { Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Chef } from './Chef';
import { Recipe } from './Recipe';
import { TimeSlot } from './TimeSlot';
import { defineAssociations } from './associations';

// Initialize all models
const models = {
  User,
  Chef,
  Recipe,
  TimeSlot,
};

// Sync database
const syncDatabase = async () => {
  try {
    // Define associations before syncing
    defineAssociations();
   
    // Sync database
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    throw error;
  }
};

export { models, syncDatabase }; 