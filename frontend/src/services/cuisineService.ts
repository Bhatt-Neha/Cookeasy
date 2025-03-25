import { API_BASE_URL } from '@/config';
import { useSession } from 'next-auth/react';

export interface Cuisine {
  id?: string;
  name: string;
  image: any;
  description?: string;
  ratings?: number;
  totalReviews?: number;
  total_time?: number;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  cuisine?: string;
  chefId?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
}

// Helper function to get complete image URL
export const getImageUrl = (imageUrl: string): string => {
  // Check if the URL is absolute (starts with http:// or https://)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path, prepend the API base URL
  return `${API_BASE_URL}${imageUrl}`;
};

export const getCuisines = async (): Promise<Cuisine[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This is important for cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cuisines');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    throw error;
  }
}; 

export const getCuisine = async (cuisineId: string): Promise<Cuisine[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${cuisineId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This is important for cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cuisines');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    throw error;
  }
}; 


export const addRecipe = async (recipe: Cuisine): Promise<Cuisine[]> => {
  const { data: session } = useSession(); 
const token = session?.user
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetching cuisines:', error);
    throw error;
  }
}; 

export const deleteRecipe = async (recipeId: string): Promise<void> => {
  const { data: session } = useSession(); 
const token = session?.user
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete recipe');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

