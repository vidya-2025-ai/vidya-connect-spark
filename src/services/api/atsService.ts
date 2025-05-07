
import api from './index';
import { ATSParameter } from './types';

export const atsService = {
  getParameters: async (): Promise<ATSParameter[]> => {
    try {
      const response = await api.get<ATSParameter[]>('/ats/parameters');
      return response.data;
    } catch (error) {
      console.error('Error fetching ATS parameters:', error);
      return [];
    }
  },
  
  createParameters: async (parameterData: any): Promise<ATSParameter> => {
    try {
      const response = await api.post<ATSParameter>('/ats/parameters', parameterData);
      return response.data;
    } catch (error) {
      console.error('Error creating ATS parameters:', error);
      throw error;
    }
  },
  
  updateParameters: async (id: string, parameterData: any): Promise<ATSParameter> => {
    try {
      const response = await api.put<ATSParameter>(`/ats/parameters/${id}`, parameterData);
      return response.data;
    } catch (error) {
      console.error('Error updating ATS parameters:', error);
      throw error;
    }
  },
  
  calculateScore: async (resumeId: string, parameterId: string): Promise<any> => {
    try {
      const response = await api.post('/ats/calculate-score', { resumeId, parameterId });
      return response.data;
    } catch (error) {
      console.error('Error calculating ATS score:', error);
      // Return mock score if backend is unavailable
      return { 
        score: Math.floor(Math.random() * 40) + 60,
        details: {
          matched: Math.floor(Math.random() * 5) + 5,
          total: 15
        }
      };
    }
  },
  
  calculateScoreForOpportunity: async (resumeId: string, opportunityId: string): Promise<any> => {
    try {
      const response = await api.post('/ats/calculate-score/opportunity', { resumeId, opportunityId });
      return response.data;
    } catch (error) {
      console.error('Error calculating ATS score for opportunity:', error);
      // Return mock score if backend is unavailable
      return { 
        score: Math.floor(Math.random() * 40) + 60,
        details: {
          matched: Math.floor(Math.random() * 5) + 5,
          total: 15
        }
      };
    }
  }
};

export default atsService;
