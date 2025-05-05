
import api from './index';
import { User, PaginatedResponse } from './types';

export interface CandidateFilters {
  role?: string;
  skills?: string[];
  name?: string;
  experienceLevel?: string;
  education?: string;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CandidateSkill {
  id: string;
  name: string;
  category: string;
  level: number;
  assessments: Array<{
    score: number;
    date: string;
    certificate?: string;
  }>;
}

export interface CandidateProfile extends User {
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }>;
}

export const candidateService = {
  searchCandidates: async (filters: CandidateFilters = {}): Promise<User[]> => {
    const params: any = { ...filters };
    
    // Format skills array for query params if present
    if (filters.skills && filters.skills.length) {
      params.skills = filters.skills.join(',');
    }
    
    const response = await api.get<PaginatedResponse<User>>('/users/search', { params });
    return response.data.candidates || [];
  },
  
  getCandidateProfile: async (id: string): Promise<CandidateProfile> => {
    const response = await api.get<CandidateProfile>(`/users/${id}/profile`);
    return response.data;
  },
  
  getCandidateSkills: async (id: string): Promise<CandidateSkill[]> => {
    const response = await api.get<CandidateSkill[]>(`/users/${id}/skills`);
    return response.data;
  },
  
  getTalentPoolStats: async (): Promise<{
    talentPoolSize: number;
    educationDistribution: Record<string, number>;
    experienceDistribution: Record<string, number>;
    averageSkillMatch: number;
    skillGaps: string[];
  }> => {
    const response = await api.get('/dashboard/recruiter/talent');
    return response.data;
  }
};

export default candidateService;
