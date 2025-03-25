import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Chef } from '../models/Chef';
import { User } from '../models/User';

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { chefId, content, rating } = req.body;
    const userId = req.user?.id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if chef exists
    const chef = await Chef.findByPk(chefId);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }

    // Create comment
    const comment = await Comment.create({
      userId,
      chefId,
      content,
      rating,
    });

    // Update chef's rating and total reviews
    const allComments = await Comment.findAll({ where: { chefId } });
    const totalRating = allComments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
    const averageRating = totalRating / allComments.length;

    await chef.update({
      rating: averageRating,
      totalReviews: allComments.length,
    });

    // Fetch comment with user details
    const commentWithUser = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'profileImage'],
        },
      ],
    });

    if (!commentWithUser) {
      console.error('Comment not found after creation');
      return res.status(500).json({ message: 'Error fetching created comment' });
    }

    res.status(201).json(commentWithUser);
  } catch (error: any) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

// Get all comments for a chef
export const getChefComments = async (req: Request, res: Response) => {
  try {
    const { chefId } = req.params;

    const comments = await Comment.findAll({
      where: { chefId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'profileImage'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(comments);
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user?.id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const comment = await Comment.findOne({
      where: { id: commentId, userId },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    await comment.update({ content, rating });

    // Update chef's rating
    const chef = await Chef.findByPk(comment.chefId);
    if (chef) {
      const allComments = await Comment.findAll({ where: { chefId: chef.id } });
      const totalRating = allComments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
      const averageRating = totalRating / allComments.length;

      await chef.update({
        rating: averageRating,
      });
    }

    const updatedComment = await Comment.findOne({
      where: { id: commentId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'profileImage'],
        },
      ],
    });

    res.json(updatedComment);
  } catch (error: any) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const comment = await Comment.findOne({
      where: { id: commentId, userId },
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    const chefId = comment.chefId;
    await comment.destroy();

    // Update chef's rating
    const chef = await Chef.findByPk(chefId);
    if (chef) {
      const allComments = await Comment.findAll({ where: { chefId } });
      const totalRating = allComments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
      const averageRating = allComments.length > 0 ? totalRating / allComments.length : 0;

      await chef.update({
        rating: averageRating,
        totalReviews: allComments.length,
      });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
}; 