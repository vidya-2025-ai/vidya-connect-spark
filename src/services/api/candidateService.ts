
import api from './index';
import { User, PaginatedResponse } from './types';

export interface CandidateFilters {
  role?: string;
  name?: string;
  skills?: string[];
  location?: string;
  experienceLevel?: string;
  education?: string;
  availability?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  search?: string;
}

export interface CandidateStatistics {
  totalCandidates: number;
  bySkill: {
    skill: string;
    count: number;
  }[];
  byExperience: {
    level: string;
    count: number;
  }[];
  byLocation: {
    location: string;
    count: number;
  }[];
}

const candidateService = {
  searchCandidates: async (filters: CandidateFilters = {}): Promise<User[]> => {
    const response = await api.get<PaginatedResponse<User>>('/candidates/search', { 
      params: filters 
    });
    return response.data.data || [];
  },
  
  getCandidateById: async (id: string): Promise<User> => {
    const response = await api.get<User>(`/candidates/${id}`);
    return response.data;
  },
  
  getCandidateStatistics: async (): Promise<CandidateStatistics> => {
    const response = await api.get<CandidateStatistics>('/candidates/statistics');
    return response.data;
  },
  
  getRecommendedCandidates: async (opportunityId: string): Promise<User[]> => {
    const response = await api.get<User[]>(`/candidates/recommended/${opportunityId}`);
    return response.data;
  },
  
  addCandidateToShortlist: async (candidateId: string, opportunityId: string): Promise<any> => {
    const response = await api.post<any>('/candidates/shortlist', { candidateId, opportunityId });
    return response.data;
  },
  
  removeCandidateFromShortlist: async (candidateId: string, opportunityId: string): Promise<any> => {
    const response = await api.delete<any>('/candidates/shortlist', { 
      data: { candidateId, opportunityId } 
    });
    return response.data;
  },
  
  getShortlistedCandidates: async (opportunityId: string): Promise<User[]> => {
    const response = await api.get<User[]>(`/candidates/shortlisted/${opportunityId}`);
    return response.data;
  }
};

export default candidateService;
