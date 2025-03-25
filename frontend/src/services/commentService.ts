import { API_BASE_URL } from '@/config';
import Cookies from 'js-cookie';

export interface Comment {
chefId: string;
content:string;
rating:number;
}

export interface commentResponse extends Comment{
    id:string,
    user:{
        id:string,
        name:string,
        profileImage:any
    }
}
// Helper function to get the token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return Cookies.get('token');
  }
  return null;
};

export const createComment = async (comment:Comment): Promise<commentResponse> => {
  const token = getToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};


export const getChefComments = async (chefId:string): Promise<commentResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/chef/${chefId}`,{
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
  