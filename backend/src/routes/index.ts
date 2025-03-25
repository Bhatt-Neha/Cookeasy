import express from 'express';
import authRoutes from './authRoutes';
import recipeRoutes from './recipeRoutes';
import chefRoutes from './chefRoutes';
import timeSlotRoutes from './timeSlotRoutes';
import commentRoutes from './commentRoutes';
import bookingRoutes from './bookingRoutes';
const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/recipes', recipeRoutes);
router.use('/chefs', chefRoutes);
router.use('/timeSlots', timeSlotRoutes);
router.use('/comments', commentRoutes);
router.use('/bookings', bookingRoutes);

export default router; 