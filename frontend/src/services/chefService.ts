import { API_BASE_URL } from '@/config';

export interface Chef {
  id: string;
  userId: string;
  name: string;
  cuisine: string;
  bio: string;
  rating: number;
  totalReviews: number;
  profileImage: string;
  price: number;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isChef: boolean;
}

export const getChefs = async (): Promise<Chef[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chefs`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json',
    }
});
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching chefs:', error);
    throw error;
  } 
};


export const getChefById = async (chefId: string): Promise<Chef> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chefs/${chefId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chef by ID:', error);
    throw error;
  }
};