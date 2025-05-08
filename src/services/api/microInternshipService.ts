
import api from './index';
import { MicroInternship, MicroInternshipApplication } from './types';

// Mock data for microinternships
const mockMicroInternships = [
  {
    id: 'mi1',
    title: 'Frontend Component Development',
    description: 'Build reusable UI components using React and Tailwind CSS for our design system library.',
    company: 'Design Systems Co.',
    category: 'Development',
    skills: ['React', 'Tailwind CSS', 'TypeScript'],
    duration: 20, // hours
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 18,
    status: 'active',
    remote: true,
    compensation: 900
  },
  {
    id: 'mi2',
    title: 'Data Analysis Project',
    description: 'Analyze customer behavior data using Python and create visualizations to identify key trends.',
    company: 'Data Insights Inc.',
    category: 'Data Science',
    skills: ['Python', 'Pandas', 'Data Visualization'],
    duration: 15, // hours
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 24,
    status: 'active',
    remote: true,
    compensation: 750
  },
  {
    id: 'mi3',
    title: 'Content Writing for Blog',
    description: 'Create engaging blog content on technology trends for our company blog.',
    company: 'TechBlog Media',
    category: 'Content',
    skills: ['Content Writing', 'SEO', 'Research'],
    duration: 10, // hours
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    applicants: 31,
    status: 'active',
    remote: true,
    compensation: 500
  }
];

const microInternshipService = {
  getMicroInternships: async (filters: { status?: string } = {}): Promise<MicroInternship[]> => {
    try {
      const response = await api.get<MicroInternship[]>('/micro-internships', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching micro-internships:', error);
      console.warn('Returning mock micro-internship data since backend is unavailable');
      return mockMicroInternships as MicroInternship[];
    }
  },
  
  getMicroInternshipById: async (id: string): Promise<MicroInternship> => {
    try {
      const response = await api.get<MicroInternship>(`/micro-internships/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching micro-internship by ID:', error);
      const mockInternship = mockMicroInternships.find(internship => internship.id === id);
      if (mockInternship) {
        return mockInternship as MicroInternship;
      }
      throw error;
    }
  },
  
  applyToMicroInternship: async (internshipId: string, applicationData: any): Promise<MicroInternshipApplication> => {
    try {
      const response = await api.post<MicroInternshipApplication>(`/micro-internships/${internshipId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error applying to micro-internship:', error);
      throw error;
    }
  },
  
  getUserMicroInternships: async (status?: string): Promise<MicroInternship[]> => {
    try {
      const response = await api.get<MicroInternship[]>('/micro-internships/user', { params: { status } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user micro-internships:', error);
      return [];
    }
  },
  
  getUserApplications: async (status?: string): Promise<MicroInternshipApplication[]> => {
    try {
      const response = await api.get<MicroInternshipApplication[]>('/micro-internships/applications', { params: { status } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user micro-internship applications:', error);
      return [];
    }
  },
  
  createMicroInternship: async (microInternshipData: any): Promise<MicroInternship> => {
    try {
      const response = await api.post<MicroInternship>('/micro-internships', microInternshipData);
      return response.data;
    } catch (error) {
      console.error('Error creating micro-internship:', error);
      throw error;
    }
  },
  
  updateMicroInternship: async (id: string, microInternshipData: any): Promise<MicroInternship> => {
    try {
      const response = await api.put<MicroInternship>(`/micro-internships/${id}`, microInternshipData);
      return response.data;
    } catch (error) {
      console.error('Error updating micro-internship:', error);
      throw error;
    }
  }
};

export default microInternshipService;
