import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Chef } from './Chef';

interface CommentAttributes {
  id?: string;
  userId: string;
  chefId: string;
  content: string;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: string;
  public userId!: string;
  public chefId!: string;
  public content!: string;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Comment.belongsTo(models.Chef, {
      foreignKey: 'chefId',
      as: 'chef'
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    chefId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chefs',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
  }
);

export { Comment }; 