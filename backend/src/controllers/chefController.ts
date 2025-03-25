import { Request, Response } from 'express';
import { Chef } from '../models/Chef';
import { User } from '../models/User';

// Get all chefs
export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs= await Chef.findAll(
      {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'phone', 'isChef', 'profileImage'],
          },
        ],
      }
    );

    
    res.json(chefs);
  } catch (error) {
    console.error('Error in getAllChefs:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      error: 'Error fetching chefs',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get chef by ID
export const getChefById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const chef = await Chef.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone', 'isChef', 'profileImage'],
        },
      ],
    });

    if (!chef) {
     
      return res.status(404).json({ error: 'Chef not found' });
    }

    res.json(chef);
  } catch (error) {
    console.error('Error in getChefById:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      error: 'Error fetching chef',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create a new chef
export const createChef = async (req: Request, res: Response) => {
  try {
    const { userId, cuisine, bio,price } = req.body;

    // Validate required fields
    if (!userId || !cuisine || !bio || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }


    // Check if chef profile already exists
    const existingChef = await Chef.findOne({ where: { userId } });

    if (existingChef) {
      return res.status(400).json({ error: 'Chef profile already exists for this user' });
    }

    // Create chef profile
    const chef = await Chef.create({
      userId,
      cuisine,
      bio,
      price
    });

    res.status(201).json(chef);
  } catch (error) {
    console.error('Error in createChef:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      error: 'Error creating chef',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};