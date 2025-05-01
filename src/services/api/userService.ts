
import api from './index';
import { User } from './types';

export interface UserSearchParams {
  role?: string;
  skills?: string[];
  name?: string;
}

export interface UserPreferences {
  emailNotifications?: boolean;
  applicationUpdates?: boolean;
  marketingEmails?: boolean;
}

export const userService = {
  searchUsers: async (params: UserSearchParams = {}): Promise<User[]> => {
    const response = await api.get<User[]>('/users/search', { 
      params: {
        ...params,
        skills: params.skills ? params.skills.join(',') : undefined
      } 
    });
    return response.data;
  },
  
  updatePreferences: async (preferences: UserPreferences): Promise<{ preferences: UserPreferences }> => {
    const response = await api.put<{ preferences: UserPreferences }>('/users/preferences', { preferences });
    return response.data;
  },
  
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>('/users/password', { 
      currentPassword, 
      newPassword 
    });
    return response.data;
  }
};

export default userService;
