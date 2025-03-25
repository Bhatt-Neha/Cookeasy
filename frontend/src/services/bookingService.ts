import { API_BASE_URL } from '@/config';
import Cookies from 'js-cookie';
export interface Booking {
  userId: string;
  chefId: string;
  startTime: number;
  endTime: number;
  totalPrice: number;
  timeSlotId: string;
  dishes: string[];
}

// Helper function to get the token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return Cookies.get('token');
  }
  return null;
};

export const createBooking = async (booking: Booking): Promise<Booking[]> => {
  const token = getToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
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