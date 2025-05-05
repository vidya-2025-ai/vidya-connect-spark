
import api from './index';
import { MentorshipRequest, PaginatedResponse, User } from './types';

export interface MentorFilters {
  skills?: string[];
  organization?: string;
  experience?: string;
  page?: number;
  limit?: number;
}

export interface MentorshipFilters {
  status?: string;
  page?: number;
  limit?: number;
}

export interface MentorshipStats {
  totalRequests: number;
  pendingRequests: number;
  acceptedRequests: number;
  rejectedRequests: number;
  activeMentees: number;
  recentRequests: MentorshipRequest[];
}

export const mentorshipService = {
  getAllMentors: async (filters: MentorFilters = {}): Promise<User[]> => {
    const params = { ...filters };
    
    // Format skills array for query params if present
    if (filters.skills && filters.skills.length) {
      // Fix: Ensure we're setting a string, not trying to assign a string to a string[]
      params.skills = filters.skills.join(',') as any; // Using type assertion to avoid TypeScript error
    }
    
    const response = await api.get<PaginatedResponse<User>>('/mentorship/mentors', { params });
    return response.data.mentors || [];
  },
  
  getAllMentorships: async (): Promise<MentorshipRequest[]> => {
    const response = await api.get<MentorshipRequest[]>('/mentorship');
    return response.data;
  },
  
  getMyMentorships: async (filters: MentorshipFilters = {}): Promise<MentorshipRequest[]> => {
    const response = await api.get<PaginatedResponse<MentorshipRequest>>('/mentorship/my', { 
      params: filters 
    });
    return response.data.mentorships || [];
  },
  
  createMentorshipRequest: async (mentorshipData: {
    mentorId: string;
    message: string;
    topic?: string;
  }): Promise<MentorshipRequest> => {
    const response = await api.post<MentorshipRequest>('/mentorship/request', mentorshipData);
    return response.data;
  },
  
  updateMentorshipStatus: async (id: string, status: string): Promise<MentorshipRequest> => {
    const response = await api.put<MentorshipRequest>(`/mentorship/${id}/status`, { status });
    return response.data;
  },
  
  getMentorshipStats: async (): Promise<MentorshipStats> => {
    const response = await api.get<MentorshipStats>('/mentorship/stats');
    return response.data;
  }
};

export default mentorshipService;
