
import api from './index';

export interface CareerPath {
  id: number;
  name: string;
  progress: number;
  level: string;
}

export interface Milestone {
  id: number;
  name: string;
  completed: boolean;
  pathId: number;
}

export interface LearningPath {
  id: number;
  name: string;
  progress: number;
  modules: number;
}

export interface Project {
  id: number;
  name: string;
  tags: string[];
  deadline: string;
}

export interface RecommendedJob {
  id: number;
  title: string;
  company: string;
  match: number;
  skills: string[];
}

export interface Recommendation {
  id: number;
  title: string;
  description: string;
}

export interface CareerData {
  careerPaths: CareerPath[];
  milestones: Milestone[];
  interests: string[];
}

export interface Recommendations {
  careerBased: Recommendation[];
  trending: Recommendation[];
}

export const careerService = {
  getCareerData: async (): Promise<CareerData> => {
    const response = await api.get<CareerData>('/career/paths');
    return response.data;
  },
  
  getRecommendedJobs: async (): Promise<RecommendedJob[]> => {
    const response = await api.get<RecommendedJob[]>('/career/recommended-jobs');
    return response.data;
  },
  
  updateCareerInterests: async (interests: string[]): Promise<{interests: string[]}> => {
    const response = await api.put<{interests: string[]}>('/career/interests', { interests });
    return response.data;
  },
  
  getLearningPaths: async (): Promise<LearningPath[]> => {
    const response = await api.get<LearningPath[]>('/career/learning-paths');
    return response.data;
  },
  
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/career/projects');
    return response.data;
  },
  
  getRecommendations: async (): Promise<Recommendations> => {
    const response = await api.get<Recommendations>('/career/recommendations');
    return response.data;
  }
};

export default careerService;
