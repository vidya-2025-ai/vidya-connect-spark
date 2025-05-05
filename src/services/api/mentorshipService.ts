
import api from './index';
import { MentorshipRequest, User, PaginatedResponse } from './types';

export interface MentorshipFilters {
  status?: string;
  topic?: string;
  skills?: string[];
  page?: number;
  limit?: number;
}

export interface MentorshipStats {
  totalRequests: number;
  pendingRequests: number;
  activeMentees: number;
  rejectedRequests: number;
  byTopic?: {
    topic: string;
    count: number;
  }[];
  byMonth?: {
    month: string;
    count: number;
  }[];
}

export const mentorshipService = {
  getAllMentorships: async (filters: MentorshipFilters = {}): Promise<MentorshipRequest[]> => {
    const response = await api.get<PaginatedResponse<MentorshipRequest>>('/mentorship', { 
      params: filters 
    });
    return response.data.mentorships || [];
  },
  
  getMyMentorships: async (filters: MentorshipFilters = {}): Promise<MentorshipRequest[]> => {
    const response = await api.get<PaginatedResponse<MentorshipRequest>>('/mentorship/my', { 
      params: filters 
    });
    return response.data.mentorships || [];
  },
  
  createMentorshipRequest: async (mentorshipData: { mentorId: string; message: string; topic?: string }): Promise<MentorshipRequest> => {
    const response = await api.post<MentorshipRequest>('/mentorship/request', mentorshipData);
    return response.data;
  },
  
  updateMentorshipStatus: async (id: string, status: string): Promise<MentorshipRequest> => {
    const response = await api.put<MentorshipRequest>(`/mentorship/${id}/status`, { status });
    return response.data;
  },
  
  getMentors: async (filters: { skills?: string | string[] } = {}): Promise<User[]> => {
    // Use type assertion to handle both string and string[] for skills
    const params = {
      ...filters,
      skills: typeof filters.skills === 'string' ? 
        filters.skills : 
        (filters.skills && filters.skills.length > 0 ? filters.skills.join(',') : undefined)
    };
    
    const response = await api.get<PaginatedResponse<User>>('/mentorship/mentors', { params });
    return response.data.mentors || [];
  },
  
  getMentorshipStats: async (): Promise<MentorshipStats> => {
    const response = await api.get<MentorshipStats>('/mentorship/stats');
    return response.data;
  },
  
  rateMentor: async (mentorshipId: string, rating: number, feedback?: string): Promise<any> => {
    const response = await api.post(`/mentorship/${mentorshipId}/rate`, { rating, feedback });
    return response.data;
  },
  
  getMentorshipMessages: async (mentorshipId: string): Promise<any[]> => {
    const response = await api.get(`/mentorship/${mentorshipId}/messages`);
    return response.data;
  },
  
  sendMessage: async (mentorshipId: string, content: string): Promise<any> => {
    const response = await api.post(`/mentorship/${mentorshipId}/messages`, { content });
    return response.data;
  }
};

export default mentorshipService;
