
import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useToast } from '../hooks/use-toast';

export type UserRole = 'student' | 'recruiter';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  organization?: string;
  jobTitle?: string;
  skills?: string[];
  bio?: string;
  avatar?: string;
}

interface AuthData {
  token: string;
  user: User;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: string;
  jobTitle?: string;
}

// Define the type for our context
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (userData: RegisterData) => Promise<User | null>;
  logout: () => void;
};

// Create the context with a default value matching the expected type
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => null,
  register: async () => null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      // Redirect based on role
      redirectBasedOnRole(response.user.role);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.user.firstName}!`,
      });
      
      return response.user;
    } catch (error: any) {
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
  const register = async (userData: RegisterData): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      // Redirect based on role
      redirectBasedOnRole(response.user.role);
      
      toast({
        title: "Registration Successful",
        description: `Welcome to InternMatch, ${response.user.firstName}!`,
      });
      
      return response.user;
    } catch (error: any) {
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

  const redirectBasedOnRole = (role: UserRole) => {
    if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'recruiter') {
      navigate('/recruiter/dashboard');
    }
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
