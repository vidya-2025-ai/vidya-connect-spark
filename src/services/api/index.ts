
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Timeout after 15 seconds
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API error response:', error.response.status, error.response.data);
      
      // Handle token expiration
      if (error.response.status === 401) {
        // Check if it's not a login/register endpoint
        const url = error.config?.url || '';
        if (!url.includes('auth/login') && !url.includes('auth/register')) {
          console.log('Token expired or invalid, redirecting to login');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error: Could not connect to backend server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Function to get current auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export default api;
