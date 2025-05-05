
import api from './index';

export interface SkillCategory {
  category: string;
  count: number;
}

export interface SkillStatistics {
  topSkills: Array<{
    _id: string;
    name: string;
    category: string;
    userCount: number;
    averageScore: number;
  }>;
  skillsByCategory: SkillCategory[];
  assessmentScores: Array<{
    score: number;
    count: number;
  }>;
}

export const skillAssessmentService = {
  getAllSkills: async (): Promise<Array<{
    _id: string;
    name: string;
    category: string;
    description?: string;
  }>> => {
    const response = await api.get('/skills/all');
    return response.data;
  },
  
  getSkillCategories: async (): Promise<SkillCategory[]> => {
    const response = await api.get('/skills/categories');
    return response.data;
  },
  
  getAssessmentStatistics: async (): Promise<SkillStatistics> => {
    const response = await api.get('/skills/assessments/stats');
    return response.data;
  }
};

export default skillAssessmentService;
