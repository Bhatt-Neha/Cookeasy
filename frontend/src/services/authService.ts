import { API_BASE_URL } from '@/config';

import Cookies from 'js-cookie';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    isChef: boolean;
  };
}

// Helper function to get current user data
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const userStr = Cookies.get('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store the token in localStorage
   Cookies.set('token', data.token);
   Cookies.set('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = (): void => {
  try {
    // Clear local storage
    Cookies.remove('token');
    Cookies.remove('user');
    
    // Redirect to login page
    window.location.href = '/auth/login';
  } catch (error) {
    console.error('Logout error:', error);
    // Even if there's an error, try to redirect
    window.location.href = '/auth/login';
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!Cookies.get('token');
};