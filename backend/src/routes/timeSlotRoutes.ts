import express from 'express';
import { 
  getChefTimeSlots, 
  createTimeSlots, 
  updateTimeSlotStatus, 
  deleteTimeSlot 
} from '../controllers/timeSlotController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Get all time slots for a chef
router.get('/chef/:chefId', getChefTimeSlots);

// Create time slots for a chef (protected route)
router.post('/chef/:chefId', verifyToken, createTimeSlots);

// Update time slot status (protected route)
router.patch('/:slotId', verifyToken, updateTimeSlotStatus);

// Delete time slot (protected route)
router.delete('/:slotId', verifyToken, deleteTimeSlot);

export default router; 