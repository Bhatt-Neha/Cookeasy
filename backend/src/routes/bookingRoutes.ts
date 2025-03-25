import express from 'express';
import { createBooking } from '../controllers/bookingController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/', verifyToken, createBooking);

export default router; 