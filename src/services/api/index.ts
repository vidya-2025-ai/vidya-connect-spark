
import axios, { AxiosInstance } from 'axios';

// API base URL - update this to match your backend server URL
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000 // 15 seconds timeout
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
  (error) => Promise.reject(error)
);

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is a network error (like backend server not running)
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error: Could not connect to backend server');
      
      // Return mock data for development when backend is not available
      if (process.env.NODE_ENV === 'development') {
        const url = error.config?.url;
        
        // Mock resume data for ATSCalculator during development
        if (url === '/resumes' || url?.includes('/resumes')) {
          console.warn('Returning mock resume data since backend is unavailable');
          return Promise.resolve({ 
            data: [
              { _id: 'mock-resume-1', title: 'My Professional Resume', user: 'mock-user-1', skills: ['React', 'TypeScript', 'Node.js'] },
              { _id: 'mock-resume-2', title: 'Technical Resume', user: 'mock-user-1', skills: ['Java', 'Spring', 'Docker'] },
            ] 
          });
        }
        
        // Mock opportunities data
        if (url === '/opportunities' || url?.includes('/opportunities')) {
          console.warn('Returning mock opportunities data since backend is unavailable');
          return Promise.resolve({ 
            data: [
              { _id: 'mock-opp-1', title: 'Frontend Developer Internship', type: 'Internship', skillsRequired: ['React', 'CSS'], description: 'Exciting opportunity for frontend development with React' },
              { _id: 'mock-opp-2', title: 'Backend Engineer', type: 'Full-time', skillsRequired: ['Node.js', 'Express'], description: 'Build robust backend systems with our engineering team' },
              { _id: 'mock-opp-3', title: 'Data Science Intern', type: 'Internship', skillsRequired: ['Python', 'SQL'], description: 'Work on interesting data problems with our data team' },
            ] 
          });
        }
        
        // Mock ATS calculation results
        if (url?.includes('/calculate-opportunity-score')) {
          console.warn('Returning mock ATS score since backend is unavailable');
          return Promise.resolve({ 
            data: {
              score: 75,
              details: {
                matched: 15,
                total: 20,
                opportunityTitle: 'Mock Opportunity'
              }
            } 
          });
        }
      }
    }
    
    console.error('API Error:', error.response || error);
    
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      // We don't forcefully redirect here to avoid disrupting the user experience
      console.warn('Authentication error: Token invalid or expired');
    }
    
    return Promise.reject(error);
  }
);

export default api;
