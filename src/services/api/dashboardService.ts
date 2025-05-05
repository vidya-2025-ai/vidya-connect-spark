
import api from './index';
import { Application } from './types';

export interface DashboardStats {
  activeJobs: number;
  totalApplications: number;
  interviewsScheduled: number;
  mentorshipMatches: number;
  talentPoolSize: number;
}

export interface TalentPoolStats {
  talentPoolSize: number;
  educationDistribution: Record<string, number>;
  experienceDistribution: Record<string, number>;
  averageSkillMatch: number;
  skillGaps: string[];
}

export const dashboardService = {
  getRecruiterStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/recruiter/stats');
    return response.data;
  },
  
  getRecentApplications: async (limit: number = 5): Promise<Application[]> => {
    const response = await api.get('/dashboard/recruiter/recent', { 
      params: { limit } 
    });
    return response.data;
  },
  
  getTalentStats: async (): Promise<TalentPoolStats> => {
    const response = await api.get('/dashboard/recruiter/talent');
    return response.data;
  }
};

export default dashboardService;
