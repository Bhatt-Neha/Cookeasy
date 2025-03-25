import { Model } from 'sequelize';
import { User } from './User';
import { Chef } from './Chef';
import { Recipe } from './Recipe';
import { TimeSlot } from './TimeSlot';
import { Comment } from './Comment';

// Define associations
export const defineAssociations = () => {
  try {

    Chef.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });
    // User - Chef association
    
    User.hasOne(Chef, {
      foreignKey: 'userId',
      as: 'chef'
    });

    

    // Chef - Recipe association
    Chef.hasMany(Recipe, {
      foreignKey: 'chefId',
      as: 'recipes'
    });

    Recipe.belongsTo(Chef, {
      foreignKey: 'chefId',
      as: 'chef'
    });

    // Chef - TimeSlot association
    Chef.hasMany(TimeSlot, {
      foreignKey: 'chefId',
      as: 'timeSlots'
    });

    TimeSlot.belongsTo(Chef, {
      foreignKey: 'chefId',
      as: 'chef'
    });

    // User - Comment association
    User.hasMany(Comment, {
      foreignKey: 'userId',
      as: 'comments'
    });

    Comment.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Chef - Comment association
    Chef.hasMany(Comment, {
      foreignKey: 'chefId',
      as: 'comments'
    });

    Comment.belongsTo(Chef, {
      foreignKey: 'chefId',
      as: 'chef'
    });

  } catch (error) {
    console.error('Error defining associations:', error);
    throw error;
  }
};

// Sync associations
export const syncAssociations = async () => {
  try {
    console.log('Starting to sync associations...');
    
    // First define associations
    defineAssociations();

    // Then sync all models
    console.log('Syncing User model...');
    await User.sync();
    console.log('User model synced');

    console.log('Syncing Chef model...');
    await Chef.sync();
    console.log('Chef model synced');

    console.log('Syncing Recipe model...');
    await Recipe.sync();
    console.log('Recipe model synced');

    console.log('Syncing TimeSlot model...');
    await TimeSlot.sync();
    console.log('TimeSlot model synced');

    console.log('Syncing Comment model...');
    await Comment.sync();
    console.log('Comment model synced');

    console.log('All models synced successfully');
  } catch (error) {
    console.error('Error syncing associations:', error);
    throw error;
  }
};