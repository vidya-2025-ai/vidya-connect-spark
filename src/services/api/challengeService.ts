
import api from './index';
import { Challenge, ChallengeSolution, PaginatedResponse } from './types';

export interface ChallengeFilters {
  status?: string;
  skillRequired?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export interface ChallengeStatistics {
  totalChallenges: number;
  activeChallenges: number;
  completedChallenges: number;
  totalParticipants: number;
  averageSubmissions: number;
  topSkills: {
    skill: string;
    count: number;
  }[];
}

export const challengeService = {
  getChallenges: async (filters: ChallengeFilters = {}): Promise<Challenge[]> => {
    const params = { ...filters };
    
    // Format skills array for query params if present
    if (filters.skillRequired && filters.skillRequired.length) {
      params.skillRequired = filters.skillRequired.join(',') as any;
    }
    
    const response = await api.get<PaginatedResponse<Challenge>>('/challenges', {
      params
    });
    return response.data.challenges || [];
  },
  
  getRecruiterChallenges: async (filters: ChallengeFilters = {}): Promise<Challenge[]> => {
    const params = { ...filters };
    
    // Format skills array for query params if present
    if (filters.skillRequired && filters.skillRequired.length) {
      params.skillRequired = filters.skillRequired.join(',') as any;
    }
    
    const response = await api.get<PaginatedResponse<Challenge>>('/challenges/recruiter', {
      params
    });
    return response.data.challenges || [];
  },
  
  createChallenge: async (challengeData: any): Promise<Challenge> => {
    const response = await api.post<Challenge>('/challenges', challengeData);
    return response.data;
  },
  
  getChallenge: async (id: string): Promise<Challenge> => {
    const response = await api.get<Challenge>(`/challenges/${id}`);
    return response.data;
  },
  
  updateChallenge: async (id: string, challengeData: any): Promise<Challenge> => {
    const response = await api.put<Challenge>(`/challenges/${id}`, challengeData);
    return response.data;
  },
  
  deleteChallenge: async (id: string): Promise<void> => {
    await api.delete<void>(`/challenges/${id}`);
  },
  
  submitSolution: async (challengeId: string, solutionData: any): Promise<ChallengeSolution> => {
    const response = await api.post<ChallengeSolution>(`/challenges/${challengeId}/solutions`, solutionData);
    return response.data;
  },
  
  getSolutions: async (challengeId: string): Promise<ChallengeSolution[]> => {
    const response = await api.get<ChallengeSolution[]>(`/challenges/${challengeId}/solutions`);
    return response.data;
  },
  
  evaluateSolution: async (challengeId: string, solutionId: string, evaluationData: any): Promise<ChallengeSolution> => {
    const response = await api.put<ChallengeSolution>(
      `/challenges/${challengeId}/solutions/${solutionId}/evaluate`, 
      evaluationData
    );
    return response.data;
  },
  
  getChallengeStatistics: async (): Promise<ChallengeStatistics> => {
    const response = await api.get<ChallengeStatistics>('/challenges/recruiter/statistics');
    return response.data;
  },
  
  toggleChallengeStatus: async (id: string, isActive: boolean): Promise<Challenge> => {
    const response = await api.put<Challenge>(`/challenges/${id}/status`, { isActive });
    return response.data;
  }
};

export default challengeService;
