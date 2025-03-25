import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface TimeSlotAttributes {
  id?: string;
  chefId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isBooked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class TimeSlot extends Model<TimeSlotAttributes> implements TimeSlotAttributes {
  public id!: string;
  public chefId!: string;
  public date!: Date;
  public startTime!: string;
  public endTime!: string;
  public isAvailable!: boolean;
  public isBooked!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    TimeSlot.belongsTo(models.Chef, {
      foreignKey: 'chefId',
      as: 'chef'
    });
  }
}

TimeSlot.init(
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'TimeSlot',
    tableName: 'timeslots',
    timestamps: true
  }
);

export { TimeSlot }; 