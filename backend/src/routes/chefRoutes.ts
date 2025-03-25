import express from 'express';
import { getAllChefs, getChefById, createChef } from '../controllers/chefController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Get all chefs (public route)
router.get('/', getAllChefs);

// Get chef by ID (public route)
router.get('/:id', getChefById);

// Create a new chef (protected route)
router.post('/', verifyToken, createChef);

export default router; 