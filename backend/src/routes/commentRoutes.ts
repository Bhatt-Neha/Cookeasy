import express from 'express';
import { createComment, getChefComments, updateComment, deleteComment } from '../controllers/commentController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Create a new comment (requires authentication)
router.post('/', verifyToken, createComment);

// Get all comments for a chef
router.get('/chef/:chefId', getChefComments);

// Update a comment (requires authentication)
router.put('/:commentId', verifyToken, updateComment);

// Delete a comment (requires authentication)
router.delete('/:commentId', verifyToken, deleteComment);

export default router; 