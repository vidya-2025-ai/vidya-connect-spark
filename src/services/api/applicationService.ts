
import api from './index';
import { Application, PaginatedResponse } from './types';

const applicationService = {
  getApplicationsByOpportunity: async (opportunityId: string, status?: string): Promise<Application[]> => {
    try {
      const response = await api.get<Application[]>(`/applications/opportunity/${opportunityId}`, {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching applications by opportunity:', error);
      return [];
    }
  },
  
  getStudentApplications: async (filters: { status?: string, sortBy?: string, sortOrder?: 'asc' | 'desc' } = {}): Promise<Application[]> => {
    try {
      const response = await api.get<Application[]>('/applications/student', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching student applications:', error);
      return [];
    }
  },
  
  getRecruiterApplications: async (filters: { 
    status?: string, 
    page?: number, 
    limit?: number, 
    sortBy?: string, 
    sortOrder?: 'asc' | 'desc',
    search?: string
  } = {}): Promise<Application[]> => {
    try {
      const response = await api.get<PaginatedResponse<Application>>('/applications/recruiter', { params: filters });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching recruiter applications:', error);
      return [];
    }
  },
  
  getApplicationById: async (id: string): Promise<Application> => {
    try {
      const response = await api.get<Application>(`/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application by id:', error);
      throw error;
    }
  },
  
  createApplication: async (opportunityId: string, applicationData: any): Promise<Application> => {
    try {
      const response = await api.post<Application>(`/applications/opportunity/${opportunityId}`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },
  
  updateApplicationStatus: async (applicationId: string, status: string): Promise<Application> => {
    try {
      const response = await api.put<Application>(`/applications/${applicationId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },
  
  addApplicationNote: async (applicationId: string, note: string): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(`/applications/${applicationId}/notes`, { note });
      return response.data;
    } catch (error) {
      console.error('Error adding application note:', error);
      throw error;
    }
  },
  
  scheduleInterview: async (applicationId: string, interviewData: {
    date: string;
    time: string;
    location?: string;
    interviewers?: string[];
    type: string;
  }): Promise<Application> => {
    try {
      const response = await api.post<Application>(`/applications/${applicationId}/interview`, interviewData);
      return response.data;
    } catch (error) {
      console.error('Error scheduling interview:', error);
      throw error;
    }
  },
  
  withdrawApplication: async (applicationId: string): Promise<{ message: string }> => {
    try {
      const response = await api.put<{ message: string }>(`/applications/${applicationId}/withdraw`);
      return response.data;
    } catch (error) {
      console.error('Error withdrawing application:', error);
      throw error;
    }
  },
  
  getApplicationStatistics: async (): Promise<{
    totalApplications: number;
    byStatus: Record<string, number>;
    recentApplications: Application[];
    interviewsUpcoming: number;
  }> => {
    try {
      const response = await api.get('/applications/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching application statistics:', error);
      return {
        totalApplications: 0,
        byStatus: {},
        recentApplications: [],
        interviewsUpcoming: 0
      };
    }
  },
  
  provideFeedback: async (applicationId: string, feedback: string): Promise<Application> => {
    try {
      const response = await api.post<Application>(`/applications/${applicationId}/feedback`, { feedback });
      return response.data;
    } catch (error) {
      console.error('Error providing feedback:', error);
      throw error;
    }
  }
};

export default applicationService;
