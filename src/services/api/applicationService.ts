import api from './index';
import { Application, PaginatedResponse } from './types';

export interface ApplicationFilters {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const applicationService = {
  getStudentApplications: async (filters: ApplicationFilters = {}): Promise<Application[]> => {
    const response = await api.get<PaginatedResponse<Application>>('/applications', { params: filters });
    return response.data.applications || [];
  },
  
  getRecruiterApplications: async (filters: ApplicationFilters = {}): Promise<Application[]> => {
    const response = await api.get<PaginatedResponse<Application>>('/applications/recruiter', { params: filters });
    return response.data.applications || [];
  },
  
  getOpportunityApplications: async (
    opportunityId: string, 
    filters: ApplicationFilters = {}
  ): Promise<Application[]> => {
    const response = await api.get<PaginatedResponse<Application>>(
      `/applications/opportunity/${opportunityId}`, 
      { params: filters }
    );
    return response.data.applications || [];
  },
  
  createApplication: async (opportunityId: string, applicationData: any): Promise<Application> => {
    const response = await api.post<Application>(`/applications/opportunity/${opportunityId}`, applicationData);
    return response.data;
  },
  
  updateApplicationStatus: async (id: string, status: string): Promise<Application> => {
    const response = await api.put<Application>(`/applications/${id}/status`, { status });
    return response.data;
  },
  
  getApplicationDetails: async (id: string): Promise<Application> => {
    const response = await api.get<Application>(`/applications/${id}`);
    return response.data;
  },
  
  addNote: async (id: string, note: string): Promise<Application> => {
    const response = await api.post<Application>(`/applications/${id}/notes`, { note });
    return response.data;
  },
  
  scheduleInterview: async (id: string, interviewDate: string): Promise<Application> => {
    const response = await api.put<Application>(`/applications/${id}/interview`, { interviewDate });
    return response.data;
  },
  
  addFeedback: async (id: string, feedback: string, rating?: number): Promise<Application> => {
    const response = await api.post<Application>(`/applications/${id}/feedback`, { feedback, rating });
    return response.data;
  }
};

export default applicationService;
