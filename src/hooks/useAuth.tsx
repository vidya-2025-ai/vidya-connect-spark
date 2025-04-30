
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useToast } from '../hooks/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      // Redirect based on role
      if (response.user.role === 'student') {
        navigate('/student/dashboard');
      } else if (response.user.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else if (response.user.role === 'university') {
        navigate('/university/dashboard');
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.user.firstName}!`,
      });
      
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      // Redirect based on role
      if (response.user.role === 'student') {
        navigate('/student/dashboard');
      } else if (response.user.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else if (response.user.role === 'university') {
        navigate('/university/dashboard');
      }
      
      toast({
        title: "Registration Successful",
        description: `Welcome to InternMatch, ${response.user.firstName}!`,
      });
      
      return response.user;
    } catch (error) {
      console.error('Register error:', error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
