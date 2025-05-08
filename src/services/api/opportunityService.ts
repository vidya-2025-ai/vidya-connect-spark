import api from './index';
import { Opportunity, PaginatedResponse, ApplicationStats } from './types';

// Sample opportunity data for mock responses
const mockOpportunities = [
  {
    _id: "opp1",
    id: "opp1", // Adding id to match interface
    title: "Frontend Developer Intern",
    description: "Join our team to build modern web applications using React and TypeScript",
    organization: "Tech Innovations",
    type: "Internship",
    duration: "3 months",
    location: "Remote",
    skillsRequired: ["React", "TypeScript", "CSS"],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    stipend: { amount: 10000, currency: "INR" },
    createdAt: new Date().toISOString(),
    isActive: true,
    requirements: ["Strong JavaScript knowledge", "Experience with React", "Good problem-solving skills"],
    tags: [] // Adding empty tags array to match interface
  },
  {
    _id: "opp2",
    id: "opp2", // Adding id to match interface
    title: "Data Analyst",
    description: "Work with our data team to derive insights from large datasets",
    organization: "Data Solutions Inc.",
    type: "Full-time",
    duration: "Permanent",
    location: "Bangalore",
    skillsRequired: ["Python", "SQL", "Data Analysis"],
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    stipend: { amount: 25000, currency: "INR" },
    createdAt: new Date().toISOString(),
    isActive: true,
    requirements: ["Statistics background", "Experience with data visualization", "Python coding skills"],
    tags: [] // Adding empty tags array to match interface
  }
];

// Helper function to ensure objects match the Opportunity interface
const mapToOpportunity = (opportunity: any): Opportunity => {
  return {
    id: opportunity._id || opportunity.id,
    _id: opportunity._id || opportunity.id,
    title: opportunity.title,
    organization: opportunity.organization,
    description: opportunity.description,
    requirements: opportunity.requirements || [],
    location: opportunity.location,
    type: opportunity.type,
    duration: opportunity.duration,
    stipend: opportunity.stipend,
    deadline: opportunity.deadline,
    skillsRequired: opportunity.skillsRequired || [],
    tags: opportunity.tags || [],
    isActive: opportunity.isActive !== undefined ? opportunity.isActive : true,
    createdAt: opportunity.createdAt || new Date().toISOString()
  };
};

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
    try {
      const response = await api.get<PaginatedResponse<Opportunity>>('/opportunities', { 
        params: {
          ...filters,
          skills: filters.skills ? filters.skills.join(',') : undefined
        }
      });
      return response.data.data || response.data.opportunities || [];
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      console.warn('Returning mock opportunities data since backend is unavailable');
      // Return mock data if backend is unavailable
      return mockOpportunities.map(mapToOpportunity);
    }
  },
  
  getRecruiterOpportunities: async (filters: { status?: string, sortBy?: string, sortOrder?: 'asc' | 'desc' } = {}): Promise<OpportunityWithStats[]> => {
    try {
      const response = await api.get<OpportunityWithStats[]>('/opportunities/recruiter', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching recruiter opportunities:', error);
      return [];
    }
  },
  
  createOpportunity: async (opportunityData: any): Promise<Opportunity> => {
    try {
      const response = await api.post<Opportunity>('/opportunities', opportunityData);
      return response.data;
    } catch (error) {
      console.error('Error creating opportunity:', error);
      throw error;
    }
  },
  
  getOpportunityById: async (id: string): Promise<OpportunityWithStats> => {
    try {
      const response = await api.get<OpportunityWithStats>(`/opportunities/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching opportunity details:', error);
      // Return mock data if backend is unavailable
      const mockOpportunity = mockOpportunities.find(opp => opp._id === id || opp.id === id);
      if (mockOpportunity) {
        return mapToOpportunity(mockOpportunity) as OpportunityWithStats;
      }
      throw error;
    }
  },
  
  updateOpportunity: async (id: string, opportunityData: any): Promise<Opportunity> => {
    try {
      const response = await api.put<Opportunity>(`/opportunities/${id}`, opportunityData);
      return response.data;
    } catch (error) {
      console.error('Error updating opportunity:', error);
      throw error;
    }
  },
  
  applyToOpportunity: async (opportunityId: string, applicationData: any): Promise<any> => {
    try {
      const response = await api.post(`/applications/opportunity/${opportunityId}`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error applying to opportunity:', error);
      throw error;
    }
  },
  
  getRecommendedOpportunities: async (): Promise<Opportunity[]> => {
    try {
      const response = await api.get<Opportunity[]>('/opportunities/recommendations');
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended opportunities:', error);
      // Return mock data if backend is unavailable
      return mockOpportunities.slice(0, 1);
    }
  },
  
  saveOpportunity: async (opportunityId: string): Promise<{ message: string }> => {
    try {
      const response = await api.post<{ message: string }>(`/opportunities/${opportunityId}/save`);
      return response.data;
    } catch (error) {
      console.error('Error saving opportunity:', error);
      throw error;
    }
  },
  
  removeSavedOpportunity: async (opportunityId: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(`/opportunities/${opportunityId}/save`);
      return response.data;
    } catch (error) {
      console.error('Error removing saved opportunity:', error);
      throw error;
    }
  },
  
  getSavedOpportunities: async (): Promise<Opportunity[]> => {
    try {
      const response = await api.get<Opportunity[]>('/opportunities/saved/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved opportunities:', error);
      return [];
    }
  },
  
  getCandidates: async (
    opportunityId: string, 
    filters: { status?: string, sort?: string, order?: 'asc' | 'desc' } = {}
  ): Promise<any[]> => {
    try {
      const response = await api.get(`/opportunities/${opportunityId}/candidates`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      return [];
    }
  },
  
  getDashboardStats: async (): Promise<{
    activeJobs: number;
    totalApplications: number;
    interviewsScheduled: number;
    mentorshipMatches: number;
  }> => {
    try {
      const response = await api.get('/opportunities/recruiter/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        activeJobs: 0,
        totalApplications: 0,
        interviewsScheduled: 0,
        mentorshipMatches: 0
      };
    }
  },
  
  getRecentApplications: async (limit: number = 5): Promise<any[]> => {
    try {
      const response = await api.get('/applications/recruiter/recent', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent applications:', error);
      return [];
    }
  }
};

export default opportunityService;
