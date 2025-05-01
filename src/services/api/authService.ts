
import api from './index';
import { User, RegisterData } from './types';

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    const response = await api.post<void>('/auth/logout');
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },
  
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/users/profile', profileData);
    return response.data;
  }
};

export default authService;
