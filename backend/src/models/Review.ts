import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Chef } from './Chef';

interface ReviewAttributes {
  id: string;
  userId: string;
  chefId: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Review extends Model<ReviewAttributes> implements ReviewAttributes {
  public id!: string;
  public userId!: string;
  public chefId!: string;
  public rating!: number;
  public comment!: string;
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
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
        model: User,
        key: 'id',
      },
    },
    chefId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Chef,
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  }
);

export { Review };