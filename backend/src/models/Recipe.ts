import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Chef } from './Chef';

interface RecipeAttributes {
  id?: string;
  chefId: string;
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  image?: string;
  tags?: string[];
  rating?: number;
  totalReviews?: number;
  cuisine: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
  public id!: string;
  public chefId!: string;
  public name!: string;
  public description!: string;
  public ingredients!: string[];
  public instructions!: string[];
  public prepTime!: number;
  public cookTime!: number;
  public servings!: number;
  public image!: string;
  public tags!: string[];
  public rating!: number;
  public totalReviews!: number;
  public cuisine!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Recipe.belongsTo(models.Chef, {
      foreignKey: 'chefId',
      as: 'chefs'
    });
  }
}

Recipe.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chefId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chefs',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    prepTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cookTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cuisine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: true
  }
);

export { Recipe };