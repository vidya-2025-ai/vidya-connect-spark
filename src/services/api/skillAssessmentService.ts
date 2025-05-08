
import api from './index';

interface AssessmentStatistics {
  topSkills: Array<{
    name: string;
    userCount: number;
    averageScore: number;
  }>;
  skillsByCategory: Array<{
    category: string;
    count: number;
    skills: string[];
  }>;
  assessmentScores: Array<{
    score: number;
    count: number;
  }>;
  totalAssessments: number;
  averageCompletionTime: number;
}

// Sample assessment data for mock responses
const mockAssessmentStats: AssessmentStatistics = {
  topSkills: [
    { name: 'React', userCount: 86, averageScore: 4.2 },
    { name: 'JavaScript', userCount: 102, averageScore: 3.9 },
    { name: 'TypeScript', userCount: 56, averageScore: 3.8 },
    { name: 'Python', userCount: 78, averageScore: 4.1 },
    { name: 'Node.js', userCount: 65, averageScore: 3.7 },
    { name: 'SQL', userCount: 92, averageScore: 3.6 },
    { name: 'AWS', userCount: 42, averageScore: 3.3 },
    { name: 'Java', userCount: 58, averageScore: 3.9 },
    { name: 'UI/UX Design', userCount: 39, averageScore: 4.0 }
  ],
  skillsByCategory: [
    { category: 'Frontend', count: 244, skills: ['React', 'JavaScript', 'HTML/CSS', 'Vue.js'] },
    { category: 'Backend', count: 186, skills: ['Node.js', 'Python', 'Java', 'Ruby'] },
    { category: 'Database', count: 152, skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'] },
    { category: 'DevOps', count: 98, skills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD'] },
    { category: 'Design', count: 75, skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Sketch'] }
  ],
  assessmentScores: [
    { score: 1, count: 12 },
    { score: 2, count: 38 },
    { score: 3, count: 95 },
    { score: 4, count: 153 },
    { score: 5, count: 67 }
  ],
  totalAssessments: 365,
  averageCompletionTime: 28 // minutes
};

const skillAssessmentService = {
  getAssessmentStatistics: async (timeRange = 'all'): Promise<AssessmentStatistics> => {
    try {
      const response = await api.get<AssessmentStatistics>('/skill-assessments/stats', { params: { timeRange } });
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment statistics:', error);
      console.warn('Returning mock assessment data since backend is unavailable');
      return mockAssessmentStats;
    }
  },
  
  createAssessment: async (assessmentData: any): Promise<any> => {
    try {
      const response = await api.post('/skill-assessments', assessmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating assessment:', error);
      throw error;
    }
  },
  
  getAssessmentById: async (id: string): Promise<any> => {
    try {
      const response = await api.get(`/skill-assessments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching assessment by ID:', error);
      throw error;
    }
  },
  
  submitAssessment: async (id: string, answers: any): Promise<any> => {
    try {
      const response = await api.post(`/skill-assessments/${id}/submit`, { answers });
      return response.data;
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    }
  },
  
  getUserAssessments: async (userId: string): Promise<any[]> => {
    try {
      const response = await api.get(`/skill-assessments/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user assessments:', error);
      return [];
    }
  },
  
  getSkillRecommendations: async (userId: string): Promise<{ recommendedSkills: string[] }> => {
    try {
      const response = await api.get(`/skill-assessments/recommendations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skill recommendations:', error);
      return { recommendedSkills: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript'] };
    }
  }
};

export default skillAssessmentService;
