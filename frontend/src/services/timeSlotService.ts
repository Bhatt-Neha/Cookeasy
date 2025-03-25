import { API_BASE_URL } from '@/config';

export interface TimeSlot {
  id: string;
  chefId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isAvailable: boolean;
}

export const getTimeSlots = async (chefId: string, date: string): Promise<TimeSlot[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/timeSlots/chef/${chefId}?date=${date}`,{
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