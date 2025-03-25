import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Chef } from './Chef';

interface BookingAttributes {
  id?: string;
  userId: string;
  chefId: string;
  bookingDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  startTime: number;
  endTime: number;
  createdAt?: Date;
  updatedAt?: Date;
  dishes: string[];
}

class Booking extends Model<BookingAttributes> implements BookingAttributes {
  public id!: string;
  public userId!: string;
  public chefId!: string;
  public bookingDate!: Date;
  public startTime!: number;
  public endTime!: number;
  public totalPrice!: number;
  public status!: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  public specialRequests!: string;
  public dishes!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
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
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    }
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
  }
);

export { Booking };