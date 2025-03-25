import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Chef } from './Chef';

interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isChef: boolean;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public isChef!: boolean;
  public profileImage!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  // public static associate(models: any) {
  //   User.hasOne(Chef, {
  //     foreignKey: 'userId',
  //     as: 'chef'
  //   });
  // }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isChef: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export { User };