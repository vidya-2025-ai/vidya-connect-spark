
import api from './index';
import { Application } from './types';

export const applicationService = {
  getStudentApplications: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/applications/student');
    return response.data;
  },
  
  getRecruiterApplications: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/applications/recruiter');
    return response.data;
  },
  
  createApplication: async (applicationData: any): Promise<Application> => {
    const response = await api.post<Application>('/applications', applicationData);
    return response.data;
  },
  
  updateApplicationStatus: async (id: string, status: string): Promise<Application> => {
    const response = await api.put<Application>(`/applications/${id}/status`, { status });
    return response.data;
  },
  
  getApplicationDetails: async (id: string): Promise<Application> => {
    const response = await api.get<Application>(`/applications/${id}`);
    return response.data;
  }
};

export default applicationService;
