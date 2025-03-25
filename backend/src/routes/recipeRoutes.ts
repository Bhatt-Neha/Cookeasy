import express from 'express';
import { getAllRecipes, createRecipe, deleteRecipe, getRecipeByCuisine } from '../controllers/recipeController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

// Get all recipes (public route)
router.get('/', getAllRecipes);
router.get('/:cuisineId', getRecipeByCuisine);
// Create a new recipe (protected route)
router.post('/', verifyToken, createRecipe);

// Delete a recipe (protected route)
router.delete('/:id', verifyToken, deleteRecipe);

export default router; 