
import api from './index';
import { Opportunity } from './types';

export interface OpportunityFilters {
  search?: string;
  type?: string;
  skills?: string[];
}

export const opportunityService = {
  getAllOpportunities: async (filters: OpportunityFilters = {}): Promise<Opportunity[]> => {
    const response = await api.get<Opportunity[]>('/opportunities', { 
      params: {
        ...filters,
        skills: filters.skills ? filters.skills.join(',') : undefined
      }
    });
    return response.data;
  },
  
  getRecruiterOpportunities: async (): Promise<Opportunity[]> => {
    const response = await api.get<Opportunity[]>('/opportunities/recruiter');
    return response.data;
  },
  
  createOpportunity: async (opportunityData: any): Promise<Opportunity> => {
    const response = await api.post<Opportunity>('/opportunities', opportunityData);
    return response.data;
  },
  
  getOpportunityById: async (id: string): Promise<Opportunity> => {
    const response = await api.get<Opportunity>(`/opportunities/${id}`);
    return response.data;
  },
  
  updateOpportunity: async (id: string, opportunityData: any): Promise<Opportunity> => {
    const response = await api.put<Opportunity>(`/opportunities/${id}`, opportunityData);
    return response.data;
  }
};

export default opportunityService;
