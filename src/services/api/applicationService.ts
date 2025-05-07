
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

export interface ApplicationReview {
  strengths: string[];
  weaknesses: string[];
  overallAssessment: string;
  recommendationLevel: 'Highly Recommended' | 'Recommended' | 'Neutral' | 'Not Recommended';
}

export const applicationService = {
  getStudentApplications: async (filters: ApplicationFilters = {}): Promise<Application[]> => {
    try {
      const response = await api.get<PaginatedResponse<Application>>('/applications', { params: filters });
      return response.data.data || response.data.applications || [];
    } catch (error) {
      console.error('Error fetching student applications:', error);
      // Return mock data if backend is unavailable
      return [];
    }
  },
  
  getRecruiterApplications: async (filters: ApplicationFilters = {}): Promise<Application[]> => {
    try {
      const response = await api.get<PaginatedResponse<Application>>('/applications/recruiter', { params: filters });
      return response.data.data || response.data.applications || [];
    } catch (error) {
      console.error('Error fetching recruiter applications:', error);
      return [];
    }
  },
  
  getOpportunityApplications: async (
    opportunityId: string, 
    filters: ApplicationFilters = {}
  ): Promise<Application[]> => {
    try {
      const response = await api.get<PaginatedResponse<Application>>(
        `/applications/opportunity/${opportunityId}`, 
        { params: filters }
      );
      return response.data.data || response.data.applications || [];
    } catch (error) {
      console.error('Error fetching opportunity applications:', error);
      return [];
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
  
  updateApplicationStatus: async (id: string, status: string): Promise<Application> => {
    try {
      const response = await api.put<Application>(`/applications/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },
  
  getApplicationDetails: async (id: string): Promise<Application> => {
    try {
      const response = await api.get<Application>(`/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      throw error;
    }
  },
  
  addNote: async (id: string, note: string): Promise<Application> => {
    try {
      const response = await api.post<Application>(`/applications/${id}/notes`, { note });
      return response.data;
    } catch (error) {
      console.error('Error adding note to application:', error);
      throw error;
    }
  },
  
  scheduleInterview: async (id: string, interviewDate: string): Promise<Application> => {
    try {
      const response = await api.put<Application>(`/applications/${id}/interview`, { interviewDate });
      return response.data;
    } catch (error) {
      console.error('Error scheduling interview:', error);
      throw error;
    }
  },
  
  addFeedback: async (id: string, feedback: string, rating?: number): Promise<Application> => {
    try {
      const response = await api.post<Application>(`/applications/${id}/feedback`, { feedback, rating });
      return response.data;
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  },

  addReview: async (id: string, review: ApplicationReview): Promise<Application> => {
    try {
      const response = await api.post<Application>(`/applications/${id}/review`, review);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },
  
  getApplicationsByStatus: async (status: string): Promise<Application[]> => {
    try {
      const response = await api.get<PaginatedResponse<Application>>('/applications/recruiter', { 
        params: { status } 
      });
      return response.data.data || response.data.applications || [];
    } catch (error) {
      console.error('Error fetching applications by status:', error);
      return [];
    }
  },
  
  getApplicationStats: async (): Promise<{
    total: number;
    pending: number;
    underReview: number;
    shortlisted: number;
    interview: number;
    accepted: number;
    rejected: number;
  }> => {
    try {
      const response = await api.get('/applications/recruiter/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching application stats:', error);
      return {
        total: 0,
        pending: 0,
        underReview: 0,
        shortlisted: 0,
        interview: 0,
        accepted: 0,
        rejected: 0
      };
    }
  }
};

export default applicationService;
