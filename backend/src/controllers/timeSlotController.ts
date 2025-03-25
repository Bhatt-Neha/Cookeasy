import { Request, Response } from 'express';
import { TimeSlot } from '../models/TimeSlot';
import { Chef } from '../models/Chef';

// Get all time slots for a chef
export const getChefTimeSlots = async (req: Request, res: Response) => {
  try {
    const { chefId } = req.params;
    const { date } = req.query;

    const where: any = { chefId };
    if (date) {
      where.date = date;
    }

    const timeSlots = await TimeSlot.findAll({
      where,
    });

    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching time slots',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create time slots for a chef
export const createTimeSlots = async (req: Request, res: Response) => {
  try {
    const { chefId } = req.params;
    const { slots } = req.body;

    // Validate chef exists
    const chef = await Chef.findByPk(chefId);
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }

    // Create multiple time slots
    const createdSlots = await TimeSlot.bulkCreate(
      slots.map((slot: any) => ({
        ...slot,
        chefId,
        isAvailable: true,
        isBooked: false
      }))
    );

    res.status(201).json(createdSlots);
  } catch (error) {
    console.error('Error creating time slots:', error);
    res.status(500).json({ 
      error: 'Error creating time slots',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update time slot status
export const updateTimeSlotStatus = async (req: Request, res: Response) => {
  try {
    const { slotId } = req.params;
    const { isAvailable, isBooked } = req.body;

    const timeSlot = await TimeSlot.findByPk(slotId);
    if (!timeSlot) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    // Update the time slot status
    await timeSlot.update({
      isAvailable,
      isBooked
    });

    res.json(timeSlot);
  } catch (error) {
    console.error('Error updating time slot:', error);
    res.status(500).json({ 
      error: 'Error updating time slot',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete time slot
export const deleteTimeSlot = async (req: Request, res: Response) => {
  try {
    const { slotId } = req.params;


    const timeSlot = await TimeSlot.findByPk(slotId);
    if (!timeSlot) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    await timeSlot.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting time slot:', error);
    res.status(500).json({ 
      error: 'Error deleting time slot',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 