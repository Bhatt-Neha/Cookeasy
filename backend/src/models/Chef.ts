import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Recipe } from './Recipe';
import { Comment } from './Comment';

interface ChefAttributes {
  id?: string;
  userId: string;
  cuisine: string;
  bio: string;
  profileImage?: string;
  rating?: number;
  totalReviews?: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Chef extends Model<ChefAttributes> implements ChefAttributes {
  public id!: string;
  public userId!: string;
  public cuisine!: string;
  public bio!: string;
  public profileImage!: string;
  public rating!: number;
  public totalReviews!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  // public static associate(models: any) {
  //   Chef.belongsTo(User, {
  //     foreignKey: 'userId',
  //     as: 'user'
  //   });
  //   Chef.hasMany(models.Recipe, {
  //     foreignKey: 'chefId',
  //   });
  //   Chef.hasMany(models.Comment, {
  //     foreignKey: 'chefId',
  //   });
  // }
}

Chef.init(
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
    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Chef',
    tableName: 'chefs',
    timestamps: true,
  }
);

export { Chef };