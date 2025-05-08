
import api from './index';
import { User } from './types';

export interface CandidateFilters {
  role?: string;
  name?: string;
  skills?: string[];
  experienceLevel?: string;
  availability?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Sample candidate data for mock responses
const mockCandidates = [
  {
    id: 'cand1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.j@example.com',
    role: 'student',
    skills: ['React', 'JavaScript', 'UI/UX Design'],
    bio: 'Frontend developer with strong design skills',
    yearsOfExperience: 1,
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Computer Science',
        field: 'Software Development',
        startDate: '2020-09-01',
        endDate: '2024-05-01',
        current: false
      }
    ],
    availability: 'Immediate',
    profileCompleteness: 85,
    lastActive: new Date().toISOString()
  },
  {
    id: 'cand2',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.s@example.com',
    role: 'student',
    skills: ['Python', 'Data Analysis', 'Machine Learning'],
    bio: 'Aspiring data scientist with strong analytical skills',
    yearsOfExperience: 0,
    education: [
      {
        institution: 'National Institute of Technology',
        degree: 'Master of Science',
        field: 'Data Science',
        startDate: '2022-08-15',
        endDate: '',
        current: true
      }
    ],
    availability: '2 Weeks',
    profileCompleteness: 92,
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'cand3',
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.c@example.com',
    role: 'student',
    skills: ['Product Management', 'Market Research', 'Business Analysis'],
    bio: 'MBA graduate with strong business acumen and analytical skills',
    yearsOfExperience: 2,
    education: [
      {
        institution: 'Business School of Economics',
        degree: 'Master of Business Administration',
        field: 'Product Management',
        startDate: '2021-09-01',
        endDate: '2023-06-15',
        current: false
      }
    ],
    availability: 'Month',
    profileCompleteness: 78,
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const candidateService = {
  searchCandidates: async (filters: CandidateFilters = {}): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users/candidates', {
        params: {
          ...filters,
          skills: filters.skills ? filters.skills.join(',') : undefined
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching candidates:', error);
      console.warn('Returning mock candidate data since backend is unavailable');
      return mockCandidates as User[];
    }
  },
  
  getCandidateById: async (id: string): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/candidates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate by ID:', error);
      const mockCandidate = mockCandidates.find(c => c.id === id);
      if (mockCandidate) {
        return mockCandidate as User;
      }
      throw error;
    }
  },
  
  getCandidateStats: async (): Promise<{
    totalCandidates: number;
    activeLastWeek: number;
    averageProfileCompleteness: number;
    topSkills: Array<{ skill: string; count: number }>;
  }> => {
    try {
      const response = await api.get('/users/candidates/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate statistics:', error);
      return {
        totalCandidates: mockCandidates.length,
        activeLastWeek: 2,
        averageProfileCompleteness: 85,
        topSkills: [
          { skill: 'JavaScript', count: 2 },
          { skill: 'Python', count: 1 },
          { skill: 'React', count: 1 }
        ]
      };
    }
  },
  
  saveCandidateNote: async (candidateId: string, note: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post(`/users/candidates/${candidateId}/notes`, { note });
      return response.data;
    } catch (error) {
      console.error('Error saving candidate note:', error);
      throw error;
    }
  },
  
  updateCandidateStatus: async (candidateId: string, status: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.put(`/users/candidates/${candidateId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating candidate status:', error);
      throw error;
    }
  }
};

export default candidateService;
