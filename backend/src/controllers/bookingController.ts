import { Request, Response } from "express";
import { Booking } from "../models/Booking"; 
import { User } from "../models/User";
import { Chef } from "../models/Chef";
import { sendBookingEmail } from "../services/emailService";
import { formatTimeLabel } from "../utils/helper";
import { Recipe } from "../models/Recipe";
import { TimeSlot } from "../models/TimeSlot";

export const createBooking = async (req: Request, res: Response) => {
    try {
      const { userId, chefId, totalPrice, startTime, endTime, timeSlotId, dishes } = req.body;
  
      if (!userId || !chefId || !totalPrice || !startTime || !endTime || !timeSlotId || !Array.isArray(dishes)) {
        return res.status(400).json({ error: 'Missing required fields or invalid dishes array' });
      }
  
      const booking = await Booking.create({
        userId,
        chefId,
        totalPrice,
        startTime,
        endTime,
        bookingDate: new Date(),
        status: 'confirmed',
        dishes: dishes
      });
  
      const user = await User.findByPk(userId);
      const chef = await Chef.findByPk(chefId);
      const recipe = await Recipe.findOne({ where: { cuisine: chef?.cuisine } });
  
      if (!user || !chef) {
        return res.status(404).json({ error: 'User or Chef not found' });
      }

      await TimeSlot.update(
        { isAvailable: false, isBooked: true },
        { where: { id: timeSlotId }}
      );
      const emailSent = await sendBookingEmail(user.email, {
        chefName: user.name,
        cuisine: chef.cuisine,
        startTime: formatTimeLabel(startTime),
        endTime: formatTimeLabel(endTime),
        totalPrice,
        bookingDate: booking.bookingDate,
        status: booking.status,
        recipeName: recipe?.name,
        dishes: dishes
      });

  
      if (!emailSent) {
        console.warn("Booking confirmed, but email not sent.");
      }
  
      res.status(201).json({ message: 'Booking confirmed and email sent!' });
  
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Error creating booking' });
    }
  };
