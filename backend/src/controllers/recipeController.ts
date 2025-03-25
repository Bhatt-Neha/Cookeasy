import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';
import { Chef } from '../models/Chef';
import { User } from '../models/User';

// Get all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{
        model: Chef,
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone', 'isChef', 'profileImage']
        }],
        as: 'chef',
        attributes: ['id',  'cuisine', 'bio', 'rating', 'totalReviews', 'profileImage', 'price']
      },
    ]
    });
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ 
      error: 'Error fetching recipes',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


export const getRecipeByCuisine = async (req: Request, res: Response) => {
  try {
    const { cuisineId } = req.params;
    const recipe = await Recipe.findAll({
      where: {
        id: cuisineId
      }
    });
    res.json(recipe);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ 
      error: 'Error fetching recipe',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Add a new recipe
export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { 
      chefId,
      name,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      cuisine,
      tags
    } = req.body;

    // Validate required fields
    if (!name || !description || !ingredients || !instructions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if chef exists
    const chef = await Chef.findByPk(chefId);
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found' });
    }

    // Create recipe
    const recipe = await Recipe.create({
      chefId,
      name,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      cuisine,
      tags: tags || []
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ 
      error: 'Error creating recipe',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete a recipe
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find recipe
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Delete recipe
    await recipe.destroy();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ 
      error: 'Error deleting recipe',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 