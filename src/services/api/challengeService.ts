
import api from './index';
import { Challenge, ChallengeSolution } from './types';

export const challengeService = {
  getChallenges: async (): Promise<Challenge[]> => {
    const response = await api.get<Challenge[]>('/challenges');
    return response.data;
  },
  
  createChallenge: async (challengeData: any): Promise<Challenge> => {
    const response = await api.post<Challenge>('/challenges', challengeData);
    return response.data;
  },
  
  getChallenge: async (id: string): Promise<Challenge> => {
    const response = await api.get<Challenge>(`/challenges/${id}`);
    return response.data;
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
  }
};

export default challengeService;
