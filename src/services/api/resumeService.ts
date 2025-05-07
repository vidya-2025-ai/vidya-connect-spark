
import api from './index';
import { Resume } from './types';

// Sample resume data for mock responses
const mockResumes = [
  {
    _id: "resume1",
    title: "Software Developer Resume",
    personalInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890"
    },
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2018-09-01",
        endDate: "2022-06-01",
        gpa: 3.8
      }
    ],
    experience: [
      {
        company: "Tech Solutions Inc",
        position: "Frontend Developer Intern",
        location: "Remote",
        startDate: "2021-05-01",
        endDate: "2021-08-31",
        current: false,
        description: "Developed and maintained web applications using React and TypeScript"
      }
    ],
    skills: ["JavaScript", "React", "TypeScript", "HTML", "CSS"],
    projects: [
      {
        title: "Personal Portfolio",
        description: "Responsive portfolio website to showcase projects",
        technologies: ["React", "TailwindCSS"],
        startDate: "2022-01-01",
        endDate: "2022-02-15"
      }
    ],
    certifications: [],
    lastUpdated: new Date().toISOString()
  }
];

export const resumeService = {
  getAllResumes: async (): Promise<Resume[]> => {
    try {
      const response = await api.get<Resume[]>('/resume');
      return response.data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      console.warn('Returning mock resume data since backend is unavailable');
      // Return mock data if backend is unavailable
      return mockResumes;
    }
  },
  
  getResumeById: async (id: string): Promise<Resume> => {
    try {
      const response = await api.get<Resume>(`/resume/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume by id:', error);
      // Return mock data if backend is unavailable
      const mockResume = mockResumes.find(resume => resume._id === id);
      if (mockResume) {
        return mockResume;
      }
      throw error;
    }
  },
  
  createResume: async (resumeData: any): Promise<Resume> => {
    try {
      const response = await api.post<Resume>('/resume', resumeData);
      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  },
  
  updateResume: async (id: string, resumeData: any): Promise<Resume> => {
    try {
      const response = await api.put<Resume>(`/resume/${id}`, resumeData);
      return response.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  },
  
  deleteResume: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(`/resume/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  },
  
  generateAIRecommendations: async (resumeId: string): Promise<{ recommendations: string[] }> => {
    try {
      const response = await api.get<{ recommendations: string[] }>(`/resume/${resumeId}/recommendations`);
      return response.data;
    } catch (error) {
      console.error('Error generating resume recommendations:', error);
      return { recommendations: ["Add specific achievements with metrics", "Include relevant keywords", "Optimize your resume format"] };
    }
  }
};

export default resumeService;
