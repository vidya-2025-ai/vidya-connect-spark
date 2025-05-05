
import api from './index';
import { Opportunity, PaginatedResponse, ApplicationStats } from './types';

export interface OpportunityFilters {
  search?: string;
  type?: string;
  skills?: string[];
  category?: string;
  experienceLevel?: string;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface OpportunityWithStats extends Opportunity {
  applicationStats?: ApplicationStats;
}

export const opportunityService = {
  getAllOpportunities: async (filters: OpportunityFilters = {}): Promise<Opportunity[]> => {
    const response = await api.get<PaginatedResponse<Opportunity>>('/opportunities', { 
      params: {
        ...filters,
        skills: filters.skills ? filters.skills.join(',') : undefined
      }
    });
    return response.data.data || response.data.opportunities || [];
  },
  
  getRecruiterOpportunities: async (filters: { status?: string, sortBy?: string, sortOrder?: 'asc' | 'desc' } = {}): Promise<OpportunityWithStats[]> => {
    const response = await api.get<OpportunityWithStats[]>('/opportunities/recruiter', { params: filters });
    return response.data;
  },
  
  createOpportunity: async (opportunityData: any): Promise<Opportunity> => {
    const response = await api.post<Opportunity>('/opportunities', opportunityData);
    return response.data;
  },
  
  getOpportunityById: async (id: string): Promise<OpportunityWithStats> => {
    const response = await api.get<OpportunityWithStats>(`/opportunities/${id}`);
    return response.data;
  },
  
  updateOpportunity: async (id: string, opportunityData: any): Promise<Opportunity> => {
    const response = await api.put<Opportunity>(`/opportunities/${id}`, opportunityData);
    return response.data;
  },
  
  applyToOpportunity: async (opportunityId: string, applicationData: any): Promise<any> => {
    const response = await api.post(`/applications/opportunity/${opportunityId}`, applicationData);
    return response.data;
  },
  
  getRecommendedOpportunities: async (): Promise<Opportunity[]> => {
    const response = await api.get<Opportunity[]>('/opportunities/recommendations');
    return response.data;
  },
  
  saveOpportunity: async (opportunityId: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(`/opportunities/${opportunityId}/save`);
    return response.data;
  },
  
  removeSavedOpportunity: async (opportunityId: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/opportunities/${opportunityId}/save`);
    return response.data;
  },
  
  getSavedOpportunities: async (): Promise<Opportunity[]> => {
    const response = await api.get<Opportunity[]>('/opportunities/saved/list');
    return response.data;
  },
  
  getCandidates: async (
    opportunityId: string, 
    filters: { status?: string, sort?: string, order?: 'asc' | 'desc' } = {}
  ): Promise<any[]> => {
    const response = await api.get(`/opportunities/${opportunityId}/candidates`, { params: filters });
    return response.data;
  },
  
  getDashboardStats: async (): Promise<{
    activeJobs: number;
    totalApplications: number;
    interviewsScheduled: number;
    mentorshipMatches: number;
  }> => {
    const response = await api.get('/opportunities/recruiter/stats');
    return response.data;
  },
  
  getRecentApplications: async (limit: number = 5): Promise<any[]> => {
    const response = await api.get('/applications/recruiter/recent', { params: { limit } });
    return response.data;
  }
};

export default opportunityService;
