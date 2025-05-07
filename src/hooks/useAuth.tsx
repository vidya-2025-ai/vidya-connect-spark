
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api/authService';
import { User } from '@/services/api/types';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Verify the token
        const { valid, user } = await authService.verifyToken();
        
        if (valid && user) {
          setUser(user);
          console.log('User authenticated:', user.id);
        } else {
          // If token is invalid, clear it
          localStorage.removeItem('token');
          setError('Session expired. Please login again.');
          toast({
            title: "Session Expired",
            description: "Please login again to continue.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error verifying authentication:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [toast]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { token, user } = await authService.login(email, password);
      
      // Token is stored in authService
      setUser(user);
      console.log('Login successful for:', user.email);
      
      // Redirect based on user role
      navigate(user.role === 'student' ? '/student/dashboard' : '/recruiter/dashboard');
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.firstName}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMsg = 'Failed to login. Please check your credentials and try again.';
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      }
      
      setError(errorMsg);
      toast({
        title: "Login Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Registering with data:', userData);
      const { token, user } = await authService.register(userData);
      
      // Token is stored in authService
      setUser(user);
      
      console.log('Registration successful:', user);
      
      // Redirect based on user role
      navigate(user.role === 'student' ? '/student/dashboard' : '/recruiter/dashboard');
      
      toast({
        title: "Registration Successful",
        description: `Welcome to Vidya-Samveda, ${user.firstName}!`,
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMsg = 'Failed to register. Please try again.';
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      }
      
      setError(errorMsg);
      toast({
        title: "Registration Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
